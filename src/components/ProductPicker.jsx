import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slice/productSlice";

const fallbackProducts = [
  { id: 1, name: "Organic Apple", price: 2.99 },
  { id: 2, name: "Fresh Banana", price: 1.5 },
  { id: 3, name: "Almond Milk", price: 3.99 },
  { id: 4, name: "Brown Rice", price: 5.49 },
  { id: 5, name: "Free Range Eggs", price: 4.0 },
];

export default function ProductPicker({
  currency = "USD",
  onChange, // (payload: { items: Array<{productId,name,quantity,price}>, total: number })
  initialSelected = [], // optional: [{ productId, name, price, quantity }]
}) {
  const dispatch = useDispatch();
  const { items, loading, fetchError } = useSelector((s) => s.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState({});

  // Initialize from parent (useful for edit flow)
  useEffect(() => {
    if (initialSelected.length) {
      const map = {};
      initialSelected.forEach((it) => {
        map[it.productId] = {
          id: it.productId,
          name: it.name,
          price: Number(it.price) || 0,
          quantity: Number(it.quantity) || 0,
        };
      });
      setSelected(map);
    }
  }, [initialSelected]);

  // Fetch products once if store is empty
  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  const products = items?.length ? items : fallbackProducts;

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-US", { style: "currency", currency }),
    [currency]
  );

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => (p.name || "").toLowerCase().includes(q));
  }, [products, searchTerm]);

  const handleAdd = (product) => {
    setSelected((prev) => {
      const cur = prev[product.id];
      return {
        ...prev,
        [product.id]: {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          quantity: (cur?.quantity || 0) + 1,
        },
      };
    });
  };

  const handleRemove = (product) => {
    setSelected((prev) => {
      const cur = prev[product.id];
      if (!cur) return prev;
      if (cur.quantity <= 1) {
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      }
      return {
        ...prev,
        [product.id]: { ...cur, quantity: cur.quantity - 1 },
      };
    });
  };

  const selectedList = useMemo(
    () =>
      Object.values(selected).map((p) => ({
        productId: p.id,
        name: p.name,
        price: Number(p.price) || 0,
        quantity: Number(p.quantity) || 0,
      })),
    [selected]
  );

  const total = useMemo(
    () => selectedList.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [selectedList]
  );

  // Emit changes to parent
  useEffect(() => {
    onChange?.({ items: selectedList, total });
  }, [selectedList, total, onChange]);

  return (
    <div className="p-3 bg-white rounded-lg border w-full">
      {/* Search */}
      <div className="flex items-center gap-2 mb-3 border rounded-lg px-3 py-2 bg-white">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="text-xs text-gray-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-sm text-gray-500 py-6 text-center">
          Loading products…
        </div>
      )}
      {fetchError && !loading && (
        <div className="text-sm text-red-600 py-2">
          Failed to load products. Showing fallback list.
        </div>
      )}

      {/* Product List */}
      <div className="max-h-64 overflow-y-auto border rounded-lg divide-y">
        {filtered.length === 0 && !loading ? (
          <div className="p-3 text-sm text-gray-500">No products found.</div>
        ) : (
          filtered.map((p) => {
            const qty = selected[p.id]?.quantity || 0;
            const priceNum = Number(p.price) || 0;
            return (
              <div
                key={p.id}
                className="flex items-center justify-between px-3 py-2 bg-white"
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{p.name}</div>
                  <div className="text-xs text-gray-500">
                    {fmt.format(priceNum)}
                    {qty > 0 && (
                      <span className="ml-2 text-gray-400">
                        · Line: {fmt.format(priceNum * qty)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemove(p)}
                    disabled={qty === 0}
                    className={`p-1 rounded border text-gray-700 ${
                      qty === 0
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                    aria-label={`Decrease ${p.name}`}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-6 text-center text-sm tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdd(p)}
                    className="p-1 rounded bg-primary text-white hover:bg-primary-dark"
                    aria-label={`Increase ${p.name}`}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer total */}
      <div className="mt-3 flex items-center justify-between font-semibold text-sm">
        <span>Total Amount</span>
        <span>{fmt.format(total)}</span>
      </div>
    </div>
  );
}
