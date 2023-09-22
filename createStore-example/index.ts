const store = createStore({
  name: "Shiv",
  age: 20,
  friends: ["Karan"],
});

const friends = store.get("friends");

store.set("friends", (prevValue) => [...prevValue, "Rahul"]);

type SetValue<Store extends Record<string, any>, K extends keyof Store> = (
  prevValue: Store[K]
) => Store[K];

//library
function createStore<TStore extends Record<string, any>>(store: TStore) {
  const initialStore = store;
  return {
    set<K extends keyof TStore>(key: K, cb: SetValue<TStore, K>) {
      initialStore[key] = cb(initialStore[key]);
    },
    get<TKey extends keyof TStore>(key: TKey) {
      return initialStore[key];
    },
  };
}
