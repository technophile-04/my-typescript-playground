import { Equal, Expect } from "../helpers/type-utils";

type StringSplitter<
  T extends string,
  D extends string
> = T extends `${infer FirstPart}${D}${infer RestPart}`
  ? [FirstPart, ...StringSplitter<RestPart, D>]
  : [T];
type StreetSuffixTester<T extends string, K extends string> = StringSplitter<
  T,
  " "
> extends [...any[], infer Last]
  ? Last extends K
    ? true
    : false
  : false;

type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about" }
  | { route: "/admin" }
  | { route: "/admin/users" };

type RoutesObject = {
  [K in Route as K["route"]]: K extends { search: infer SearchValue }
    ? SearchValue
    : never;
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": never;
        "/admin": never;
        "/admin/users": never;
      }
    >
  >
];
