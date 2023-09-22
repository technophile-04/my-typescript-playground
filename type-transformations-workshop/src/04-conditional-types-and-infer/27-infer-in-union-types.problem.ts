import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

type GetParserResult<T> = T extends Record<"parse", () => infer ObjReturnVal>
  ? ObjReturnVal
  : T extends () => infer Val
  ? Val
  : T extends Record<"extract", () => infer Val2>
  ? Val2
  : never;

type Example = GetParserResult<typeof parser1>;
type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];
