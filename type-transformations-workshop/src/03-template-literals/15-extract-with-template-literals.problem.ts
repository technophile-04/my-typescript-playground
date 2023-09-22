import { Equal, Expect } from "../helpers/type-utils";

type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";

type DynamicRoutes = Extract<Routes, `/${string}/:id`>;

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/posts/:id">>];
