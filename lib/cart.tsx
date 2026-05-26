"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { itemById, priceToNumber } from "./menu";

const STORAGE_KEY = "ltv:cart:v1";

export type CartLine = {
  id: string;
  qty: number;
};

type State = {
  lines: CartLine[];
  /** ticks every time something is added, so UI can animate the badge */
  pulse: number;
};

type Action =
  | { type: "add"; id: string; qty?: number }
  | { type: "remove"; id: string }
  | { type: "set"; id: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { ...state, lines: action.lines };
    case "add": {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.id === action.id);
      const lines = existing
        ? state.lines.map((l) =>
            l.id === action.id ? { ...l, qty: l.qty + qty } : l
          )
        : [...state.lines, { id: action.id, qty }];
      return { lines, pulse: state.pulse + 1 };
    }
    case "set": {
      if (action.qty <= 0) {
        return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.id === action.id ? { ...l, qty: action.qty } : l
        ),
      };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
    case "clear":
      return { ...state, lines: [] };
    default:
      return state;
  }
}

type Ctx = {
  state: State;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], pulse: 0 });
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        // drop unknown ids (menu may have changed)
        const validLines = parsed.filter((l) => itemById.has(l.id));
        dispatch({ type: "hydrate", lines: validLines });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore */
    }
  }, [state.lines, hydrated]);

  const value = useMemo<Ctx>(() => {
    const count = state.lines.reduce((s, l) => s + l.qty, 0);
    const total = state.lines.reduce((s, l) => {
      const item = itemById.get(l.id);
      return item ? s + priceToNumber(item.price) * l.qty : s;
    }, 0);
    return {
      state,
      add: (id, qty) => dispatch({ type: "add", id, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      setQty: (id, qty) => dispatch({ type: "set", id, qty }),
      clear: () => dispatch({ type: "clear" }),
      count,
      total,
      isOpen,
      setOpen,
      openDrawer: () => setOpen(true),
      closeDrawer: () => setOpen(false),
    };
  }, [state, isOpen]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
