
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model Hut
 * 
 */
export type Hut = $Result.DefaultSelection<Prisma.$HutPayload>
/**
 * Model RoomTypeConfig
 * 
 */
export type RoomTypeConfig = $Result.DefaultSelection<Prisma.$RoomTypeConfigPayload>
/**
 * Model Route
 * 
 */
export type Route = $Result.DefaultSelection<Prisma.$RoutePayload>
/**
 * Model Tour
 * 
 */
export type Tour = $Result.DefaultSelection<Prisma.$TourPayload>
/**
 * Model TourHut
 * 
 */
export type TourHut = $Result.DefaultSelection<Prisma.$TourHutPayload>
/**
 * Model AvailabilityCheck
 * 
 */
export type AvailabilityCheck = $Result.DefaultSelection<Prisma.$AvailabilityCheckPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BookingSystem: {
  alpsonline: 'alpsonline',
  hut_wrs: 'hut_wrs',
  sac: 'sac',
  custom: 'custom'
};

export type BookingSystem = (typeof BookingSystem)[keyof typeof BookingSystem]


export const Difficulty: {
  easy: 'easy',
  moderate: 'moderate',
  difficult: 'difficult'
};

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]


export const RoomType: {
  single: 'single',
  double: 'double',
  shared_4: 'shared_4',
  dorm: 'dorm'
};

export type RoomType = (typeof RoomType)[keyof typeof RoomType]


export const TourStatus: {
  draft: 'draft',
  checking: 'checking',
  available: 'available',
  partially_available: 'partially_available'
};

export type TourStatus = (typeof TourStatus)[keyof typeof TourStatus]


export const AccommodationType: {
  any: 'any',
  private_room: 'private_room',
  shared_room: 'shared_room',
  dorm: 'dorm'
};

export type AccommodationType = (typeof AccommodationType)[keyof typeof AccommodationType]


export const DataSource: {
  mock: 'mock',
  osm: 'osm',
  brouter: 'brouter',
  estimate: 'estimate'
};

export type DataSource = (typeof DataSource)[keyof typeof DataSource]

}

export type BookingSystem = $Enums.BookingSystem

export const BookingSystem: typeof $Enums.BookingSystem

export type Difficulty = $Enums.Difficulty

export const Difficulty: typeof $Enums.Difficulty

export type RoomType = $Enums.RoomType

export const RoomType: typeof $Enums.RoomType

export type TourStatus = $Enums.TourStatus

export const TourStatus: typeof $Enums.TourStatus

export type AccommodationType = $Enums.AccommodationType

export const AccommodationType: typeof $Enums.AccommodationType

export type DataSource = $Enums.DataSource

export const DataSource: typeof $Enums.DataSource

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Regions
 * const regions = await prisma.region.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Regions
   * const regions = await prisma.region.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hut`: Exposes CRUD operations for the **Hut** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Huts
    * const huts = await prisma.hut.findMany()
    * ```
    */
  get hut(): Prisma.HutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomTypeConfig`: Exposes CRUD operations for the **RoomTypeConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomTypeConfigs
    * const roomTypeConfigs = await prisma.roomTypeConfig.findMany()
    * ```
    */
  get roomTypeConfig(): Prisma.RoomTypeConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.route`: Exposes CRUD operations for the **Route** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Routes
    * const routes = await prisma.route.findMany()
    * ```
    */
  get route(): Prisma.RouteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tour`: Exposes CRUD operations for the **Tour** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tours
    * const tours = await prisma.tour.findMany()
    * ```
    */
  get tour(): Prisma.TourDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tourHut`: Exposes CRUD operations for the **TourHut** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TourHuts
    * const tourHuts = await prisma.tourHut.findMany()
    * ```
    */
  get tourHut(): Prisma.TourHutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.availabilityCheck`: Exposes CRUD operations for the **AvailabilityCheck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailabilityChecks
    * const availabilityChecks = await prisma.availabilityCheck.findMany()
    * ```
    */
  get availabilityCheck(): Prisma.AvailabilityCheckDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Region: 'Region',
    Hut: 'Hut',
    RoomTypeConfig: 'RoomTypeConfig',
    Route: 'Route',
    Tour: 'Tour',
    TourHut: 'TourHut',
    AvailabilityCheck: 'AvailabilityCheck'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "region" | "hut" | "roomTypeConfig" | "route" | "tour" | "tourHut" | "availabilityCheck"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      Hut: {
        payload: Prisma.$HutPayload<ExtArgs>
        fields: Prisma.HutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>
          }
          findFirst: {
            args: Prisma.HutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>
          }
          findMany: {
            args: Prisma.HutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>[]
          }
          create: {
            args: Prisma.HutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>
          }
          createMany: {
            args: Prisma.HutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>[]
          }
          delete: {
            args: Prisma.HutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>
          }
          update: {
            args: Prisma.HutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>
          }
          deleteMany: {
            args: Prisma.HutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>[]
          }
          upsert: {
            args: Prisma.HutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HutPayload>
          }
          aggregate: {
            args: Prisma.HutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHut>
          }
          groupBy: {
            args: Prisma.HutGroupByArgs<ExtArgs>
            result: $Utils.Optional<HutGroupByOutputType>[]
          }
          count: {
            args: Prisma.HutCountArgs<ExtArgs>
            result: $Utils.Optional<HutCountAggregateOutputType> | number
          }
        }
      }
      RoomTypeConfig: {
        payload: Prisma.$RoomTypeConfigPayload<ExtArgs>
        fields: Prisma.RoomTypeConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomTypeConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomTypeConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>
          }
          findFirst: {
            args: Prisma.RoomTypeConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomTypeConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>
          }
          findMany: {
            args: Prisma.RoomTypeConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>[]
          }
          create: {
            args: Prisma.RoomTypeConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>
          }
          createMany: {
            args: Prisma.RoomTypeConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomTypeConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>[]
          }
          delete: {
            args: Prisma.RoomTypeConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>
          }
          update: {
            args: Prisma.RoomTypeConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>
          }
          deleteMany: {
            args: Prisma.RoomTypeConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomTypeConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomTypeConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>[]
          }
          upsert: {
            args: Prisma.RoomTypeConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypeConfigPayload>
          }
          aggregate: {
            args: Prisma.RoomTypeConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomTypeConfig>
          }
          groupBy: {
            args: Prisma.RoomTypeConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomTypeConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomTypeConfigCountArgs<ExtArgs>
            result: $Utils.Optional<RoomTypeConfigCountAggregateOutputType> | number
          }
        }
      }
      Route: {
        payload: Prisma.$RoutePayload<ExtArgs>
        fields: Prisma.RouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findFirst: {
            args: Prisma.RouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findMany: {
            args: Prisma.RouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          create: {
            args: Prisma.RouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          createMany: {
            args: Prisma.RouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          delete: {
            args: Prisma.RouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          update: {
            args: Prisma.RouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          deleteMany: {
            args: Prisma.RouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          upsert: {
            args: Prisma.RouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          aggregate: {
            args: Prisma.RouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoute>
          }
          groupBy: {
            args: Prisma.RouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RouteCountArgs<ExtArgs>
            result: $Utils.Optional<RouteCountAggregateOutputType> | number
          }
        }
      }
      Tour: {
        payload: Prisma.$TourPayload<ExtArgs>
        fields: Prisma.TourFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TourFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TourFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>
          }
          findFirst: {
            args: Prisma.TourFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TourFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>
          }
          findMany: {
            args: Prisma.TourFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>[]
          }
          create: {
            args: Prisma.TourCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>
          }
          createMany: {
            args: Prisma.TourCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TourCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>[]
          }
          delete: {
            args: Prisma.TourDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>
          }
          update: {
            args: Prisma.TourUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>
          }
          deleteMany: {
            args: Prisma.TourDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TourUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TourUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>[]
          }
          upsert: {
            args: Prisma.TourUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourPayload>
          }
          aggregate: {
            args: Prisma.TourAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTour>
          }
          groupBy: {
            args: Prisma.TourGroupByArgs<ExtArgs>
            result: $Utils.Optional<TourGroupByOutputType>[]
          }
          count: {
            args: Prisma.TourCountArgs<ExtArgs>
            result: $Utils.Optional<TourCountAggregateOutputType> | number
          }
        }
      }
      TourHut: {
        payload: Prisma.$TourHutPayload<ExtArgs>
        fields: Prisma.TourHutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TourHutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TourHutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>
          }
          findFirst: {
            args: Prisma.TourHutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TourHutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>
          }
          findMany: {
            args: Prisma.TourHutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>[]
          }
          create: {
            args: Prisma.TourHutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>
          }
          createMany: {
            args: Prisma.TourHutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TourHutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>[]
          }
          delete: {
            args: Prisma.TourHutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>
          }
          update: {
            args: Prisma.TourHutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>
          }
          deleteMany: {
            args: Prisma.TourHutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TourHutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TourHutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>[]
          }
          upsert: {
            args: Prisma.TourHutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourHutPayload>
          }
          aggregate: {
            args: Prisma.TourHutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTourHut>
          }
          groupBy: {
            args: Prisma.TourHutGroupByArgs<ExtArgs>
            result: $Utils.Optional<TourHutGroupByOutputType>[]
          }
          count: {
            args: Prisma.TourHutCountArgs<ExtArgs>
            result: $Utils.Optional<TourHutCountAggregateOutputType> | number
          }
        }
      }
      AvailabilityCheck: {
        payload: Prisma.$AvailabilityCheckPayload<ExtArgs>
        fields: Prisma.AvailabilityCheckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailabilityCheckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailabilityCheckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>
          }
          findFirst: {
            args: Prisma.AvailabilityCheckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailabilityCheckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>
          }
          findMany: {
            args: Prisma.AvailabilityCheckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>[]
          }
          create: {
            args: Prisma.AvailabilityCheckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>
          }
          createMany: {
            args: Prisma.AvailabilityCheckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailabilityCheckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>[]
          }
          delete: {
            args: Prisma.AvailabilityCheckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>
          }
          update: {
            args: Prisma.AvailabilityCheckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>
          }
          deleteMany: {
            args: Prisma.AvailabilityCheckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailabilityCheckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvailabilityCheckUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>[]
          }
          upsert: {
            args: Prisma.AvailabilityCheckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityCheckPayload>
          }
          aggregate: {
            args: Prisma.AvailabilityCheckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailabilityCheck>
          }
          groupBy: {
            args: Prisma.AvailabilityCheckGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityCheckGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailabilityCheckCountArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityCheckCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    region?: RegionOmit
    hut?: HutOmit
    roomTypeConfig?: RoomTypeConfigOmit
    route?: RouteOmit
    tour?: TourOmit
    tourHut?: TourHutOmit
    availabilityCheck?: AvailabilityCheckOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RegionCountOutputType
   */

  export type RegionCountOutputType = {
    huts: number
  }

  export type RegionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    huts?: boolean | RegionCountOutputTypeCountHutsArgs
  }

  // Custom InputTypes
  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegionCountOutputType
     */
    select?: RegionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountHutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HutWhereInput
  }


  /**
   * Count Type HutCountOutputType
   */

  export type HutCountOutputType = {
    roomTypes: number
    routesFrom: number
    routesTo: number
    availability: number
    tourHuts: number
  }

  export type HutCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomTypes?: boolean | HutCountOutputTypeCountRoomTypesArgs
    routesFrom?: boolean | HutCountOutputTypeCountRoutesFromArgs
    routesTo?: boolean | HutCountOutputTypeCountRoutesToArgs
    availability?: boolean | HutCountOutputTypeCountAvailabilityArgs
    tourHuts?: boolean | HutCountOutputTypeCountTourHutsArgs
  }

  // Custom InputTypes
  /**
   * HutCountOutputType without action
   */
  export type HutCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HutCountOutputType
     */
    select?: HutCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HutCountOutputType without action
   */
  export type HutCountOutputTypeCountRoomTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomTypeConfigWhereInput
  }

  /**
   * HutCountOutputType without action
   */
  export type HutCountOutputTypeCountRoutesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
  }

  /**
   * HutCountOutputType without action
   */
  export type HutCountOutputTypeCountRoutesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
  }

  /**
   * HutCountOutputType without action
   */
  export type HutCountOutputTypeCountAvailabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityCheckWhereInput
  }

  /**
   * HutCountOutputType without action
   */
  export type HutCountOutputTypeCountTourHutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TourHutWhereInput
  }


  /**
   * Count Type TourCountOutputType
   */

  export type TourCountOutputType = {
    huts: number
  }

  export type TourCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    huts?: boolean | TourCountOutputTypeCountHutsArgs
  }

  // Custom InputTypes
  /**
   * TourCountOutputType without action
   */
  export type TourCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourCountOutputType
     */
    select?: TourCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TourCountOutputType without action
   */
  export type TourCountOutputTypeCountHutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TourHutWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionAvgAggregateOutputType = {
    boundingBoxMinLat: number | null
    boundingBoxMinLng: number | null
    boundingBoxMaxLat: number | null
    boundingBoxMaxLng: number | null
    centerLat: number | null
    centerLng: number | null
  }

  export type RegionSumAggregateOutputType = {
    boundingBoxMinLat: number | null
    boundingBoxMinLng: number | null
    boundingBoxMaxLat: number | null
    boundingBoxMaxLng: number | null
    centerLat: number | null
    centerLng: number | null
  }

  export type RegionMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    boundingBoxMinLat: number | null
    boundingBoxMinLng: number | null
    boundingBoxMaxLat: number | null
    boundingBoxMaxLng: number | null
    centerLat: number | null
    centerLng: number | null
  }

  export type RegionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    boundingBoxMinLat: number | null
    boundingBoxMinLng: number | null
    boundingBoxMaxLat: number | null
    boundingBoxMaxLng: number | null
    centerLat: number | null
    centerLng: number | null
  }

  export type RegionCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    boundingBoxMinLat: number
    boundingBoxMinLng: number
    boundingBoxMaxLat: number
    boundingBoxMaxLng: number
    centerLat: number
    centerLng: number
    _all: number
  }


  export type RegionAvgAggregateInputType = {
    boundingBoxMinLat?: true
    boundingBoxMinLng?: true
    boundingBoxMaxLat?: true
    boundingBoxMaxLng?: true
    centerLat?: true
    centerLng?: true
  }

  export type RegionSumAggregateInputType = {
    boundingBoxMinLat?: true
    boundingBoxMinLng?: true
    boundingBoxMaxLat?: true
    boundingBoxMaxLng?: true
    centerLat?: true
    centerLng?: true
  }

  export type RegionMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    boundingBoxMinLat?: true
    boundingBoxMinLng?: true
    boundingBoxMaxLat?: true
    boundingBoxMaxLng?: true
    centerLat?: true
    centerLng?: true
  }

  export type RegionMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    boundingBoxMinLat?: true
    boundingBoxMinLng?: true
    boundingBoxMaxLat?: true
    boundingBoxMaxLng?: true
    centerLat?: true
    centerLng?: true
  }

  export type RegionCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    boundingBoxMinLat?: true
    boundingBoxMinLng?: true
    boundingBoxMaxLat?: true
    boundingBoxMaxLng?: true
    centerLat?: true
    centerLng?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _avg?: RegionAvgAggregateInputType
    _sum?: RegionSumAggregateInputType
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    id: string
    name: string
    slug: string
    boundingBoxMinLat: number
    boundingBoxMinLng: number
    boundingBoxMaxLat: number
    boundingBoxMaxLng: number
    centerLat: number
    centerLng: number
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    boundingBoxMinLat?: boolean
    boundingBoxMinLng?: boolean
    boundingBoxMaxLat?: boolean
    boundingBoxMaxLng?: boolean
    centerLat?: boolean
    centerLng?: boolean
    huts?: boolean | Region$hutsArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    boundingBoxMinLat?: boolean
    boundingBoxMinLng?: boolean
    boundingBoxMaxLat?: boolean
    boundingBoxMaxLng?: boolean
    centerLat?: boolean
    centerLng?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    boundingBoxMinLat?: boolean
    boundingBoxMinLng?: boolean
    boundingBoxMaxLat?: boolean
    boundingBoxMaxLng?: boolean
    centerLat?: boolean
    centerLng?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    boundingBoxMinLat?: boolean
    boundingBoxMinLng?: boolean
    boundingBoxMaxLat?: boolean
    boundingBoxMaxLng?: boolean
    centerLat?: boolean
    centerLng?: boolean
  }

  export type RegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "boundingBoxMinLat" | "boundingBoxMinLng" | "boundingBoxMaxLat" | "boundingBoxMaxLng" | "centerLat" | "centerLng", ExtArgs["result"]["region"]>
  export type RegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    huts?: boolean | Region$hutsArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {
      huts: Prisma.$HutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      boundingBoxMinLat: number
      boundingBoxMinLng: number
      boundingBoxMaxLat: number
      boundingBoxMaxLng: number
      centerLat: number
      centerLng: number
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions and returns the data updated in the database.
     * @param {RegionUpdateManyAndReturnArgs} args - Arguments to update many Regions.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegionUpdateManyAndReturnArgs>(args: SelectSubset<T, RegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    huts<T extends Region$hutsArgs<ExtArgs> = {}>(args?: Subset<T, Region$hutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */
  interface RegionFieldRefs {
    readonly id: FieldRef<"Region", 'String'>
    readonly name: FieldRef<"Region", 'String'>
    readonly slug: FieldRef<"Region", 'String'>
    readonly boundingBoxMinLat: FieldRef<"Region", 'Float'>
    readonly boundingBoxMinLng: FieldRef<"Region", 'Float'>
    readonly boundingBoxMaxLat: FieldRef<"Region", 'Float'>
    readonly boundingBoxMaxLng: FieldRef<"Region", 'Float'>
    readonly centerLat: FieldRef<"Region", 'Float'>
    readonly centerLng: FieldRef<"Region", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region updateManyAndReturn
   */
  export type RegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to delete.
     */
    limit?: number
  }

  /**
   * Region.huts
   */
  export type Region$hutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    where?: HutWhereInput
    orderBy?: HutOrderByWithRelationInput | HutOrderByWithRelationInput[]
    cursor?: HutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HutScalarFieldEnum | HutScalarFieldEnum[]
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
  }


  /**
   * Model Hut
   */

  export type AggregateHut = {
    _count: HutCountAggregateOutputType | null
    _avg: HutAvgAggregateOutputType | null
    _sum: HutSumAggregateOutputType | null
    _min: HutMinAggregateOutputType | null
    _max: HutMaxAggregateOutputType | null
  }

  export type HutAvgAggregateOutputType = {
    osmId: number | null
    altitude: number | null
    lat: number | null
    lng: number | null
    capacity: number | null
  }

  export type HutSumAggregateOutputType = {
    osmId: bigint | null
    altitude: number | null
    lat: number | null
    lng: number | null
    capacity: number | null
  }

  export type HutMinAggregateOutputType = {
    id: string | null
    osmId: bigint | null
    name: string | null
    altitude: number | null
    lat: number | null
    lng: number | null
    capacity: number | null
    operator: string | null
    website: string | null
    phone: string | null
    email: string | null
    openingHours: string | null
    bookingUrl: string | null
    bookingSystem: $Enums.BookingSystem | null
    imageUrl: string | null
    description: string | null
    dataSource: $Enums.DataSource | null
    regionId: string | null
  }

  export type HutMaxAggregateOutputType = {
    id: string | null
    osmId: bigint | null
    name: string | null
    altitude: number | null
    lat: number | null
    lng: number | null
    capacity: number | null
    operator: string | null
    website: string | null
    phone: string | null
    email: string | null
    openingHours: string | null
    bookingUrl: string | null
    bookingSystem: $Enums.BookingSystem | null
    imageUrl: string | null
    description: string | null
    dataSource: $Enums.DataSource | null
    regionId: string | null
  }

  export type HutCountAggregateOutputType = {
    id: number
    osmId: number
    name: number
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator: number
    website: number
    phone: number
    email: number
    openingHours: number
    bookingUrl: number
    bookingSystem: number
    imageUrl: number
    description: number
    amenities: number
    dataSource: number
    regionId: number
    _all: number
  }


  export type HutAvgAggregateInputType = {
    osmId?: true
    altitude?: true
    lat?: true
    lng?: true
    capacity?: true
  }

  export type HutSumAggregateInputType = {
    osmId?: true
    altitude?: true
    lat?: true
    lng?: true
    capacity?: true
  }

  export type HutMinAggregateInputType = {
    id?: true
    osmId?: true
    name?: true
    altitude?: true
    lat?: true
    lng?: true
    capacity?: true
    operator?: true
    website?: true
    phone?: true
    email?: true
    openingHours?: true
    bookingUrl?: true
    bookingSystem?: true
    imageUrl?: true
    description?: true
    dataSource?: true
    regionId?: true
  }

  export type HutMaxAggregateInputType = {
    id?: true
    osmId?: true
    name?: true
    altitude?: true
    lat?: true
    lng?: true
    capacity?: true
    operator?: true
    website?: true
    phone?: true
    email?: true
    openingHours?: true
    bookingUrl?: true
    bookingSystem?: true
    imageUrl?: true
    description?: true
    dataSource?: true
    regionId?: true
  }

  export type HutCountAggregateInputType = {
    id?: true
    osmId?: true
    name?: true
    altitude?: true
    lat?: true
    lng?: true
    capacity?: true
    operator?: true
    website?: true
    phone?: true
    email?: true
    openingHours?: true
    bookingUrl?: true
    bookingSystem?: true
    imageUrl?: true
    description?: true
    amenities?: true
    dataSource?: true
    regionId?: true
    _all?: true
  }

  export type HutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hut to aggregate.
     */
    where?: HutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Huts to fetch.
     */
    orderBy?: HutOrderByWithRelationInput | HutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Huts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Huts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Huts
    **/
    _count?: true | HutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HutMaxAggregateInputType
  }

  export type GetHutAggregateType<T extends HutAggregateArgs> = {
        [P in keyof T & keyof AggregateHut]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHut[P]>
      : GetScalarType<T[P], AggregateHut[P]>
  }




  export type HutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HutWhereInput
    orderBy?: HutOrderByWithAggregationInput | HutOrderByWithAggregationInput[]
    by: HutScalarFieldEnum[] | HutScalarFieldEnum
    having?: HutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HutCountAggregateInputType | true
    _avg?: HutAvgAggregateInputType
    _sum?: HutSumAggregateInputType
    _min?: HutMinAggregateInputType
    _max?: HutMaxAggregateInputType
  }

  export type HutGroupByOutputType = {
    id: string
    osmId: bigint | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator: string | null
    website: string | null
    phone: string | null
    email: string | null
    openingHours: string | null
    bookingUrl: string | null
    bookingSystem: $Enums.BookingSystem
    imageUrl: string | null
    description: string | null
    amenities: string[]
    dataSource: $Enums.DataSource
    regionId: string
    _count: HutCountAggregateOutputType | null
    _avg: HutAvgAggregateOutputType | null
    _sum: HutSumAggregateOutputType | null
    _min: HutMinAggregateOutputType | null
    _max: HutMaxAggregateOutputType | null
  }

  type GetHutGroupByPayload<T extends HutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HutGroupByOutputType[P]>
            : GetScalarType<T[P], HutGroupByOutputType[P]>
        }
      >
    >


  export type HutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    osmId?: boolean
    name?: boolean
    altitude?: boolean
    lat?: boolean
    lng?: boolean
    capacity?: boolean
    operator?: boolean
    website?: boolean
    phone?: boolean
    email?: boolean
    openingHours?: boolean
    bookingUrl?: boolean
    bookingSystem?: boolean
    imageUrl?: boolean
    description?: boolean
    amenities?: boolean
    dataSource?: boolean
    regionId?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
    roomTypes?: boolean | Hut$roomTypesArgs<ExtArgs>
    routesFrom?: boolean | Hut$routesFromArgs<ExtArgs>
    routesTo?: boolean | Hut$routesToArgs<ExtArgs>
    availability?: boolean | Hut$availabilityArgs<ExtArgs>
    tourHuts?: boolean | Hut$tourHutsArgs<ExtArgs>
    _count?: boolean | HutCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hut"]>

  export type HutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    osmId?: boolean
    name?: boolean
    altitude?: boolean
    lat?: boolean
    lng?: boolean
    capacity?: boolean
    operator?: boolean
    website?: boolean
    phone?: boolean
    email?: boolean
    openingHours?: boolean
    bookingUrl?: boolean
    bookingSystem?: boolean
    imageUrl?: boolean
    description?: boolean
    amenities?: boolean
    dataSource?: boolean
    regionId?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hut"]>

  export type HutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    osmId?: boolean
    name?: boolean
    altitude?: boolean
    lat?: boolean
    lng?: boolean
    capacity?: boolean
    operator?: boolean
    website?: boolean
    phone?: boolean
    email?: boolean
    openingHours?: boolean
    bookingUrl?: boolean
    bookingSystem?: boolean
    imageUrl?: boolean
    description?: boolean
    amenities?: boolean
    dataSource?: boolean
    regionId?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hut"]>

  export type HutSelectScalar = {
    id?: boolean
    osmId?: boolean
    name?: boolean
    altitude?: boolean
    lat?: boolean
    lng?: boolean
    capacity?: boolean
    operator?: boolean
    website?: boolean
    phone?: boolean
    email?: boolean
    openingHours?: boolean
    bookingUrl?: boolean
    bookingSystem?: boolean
    imageUrl?: boolean
    description?: boolean
    amenities?: boolean
    dataSource?: boolean
    regionId?: boolean
  }

  export type HutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "osmId" | "name" | "altitude" | "lat" | "lng" | "capacity" | "operator" | "website" | "phone" | "email" | "openingHours" | "bookingUrl" | "bookingSystem" | "imageUrl" | "description" | "amenities" | "dataSource" | "regionId", ExtArgs["result"]["hut"]>
  export type HutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
    roomTypes?: boolean | Hut$roomTypesArgs<ExtArgs>
    routesFrom?: boolean | Hut$routesFromArgs<ExtArgs>
    routesTo?: boolean | Hut$routesToArgs<ExtArgs>
    availability?: boolean | Hut$availabilityArgs<ExtArgs>
    tourHuts?: boolean | Hut$tourHutsArgs<ExtArgs>
    _count?: boolean | HutCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type HutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $HutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hut"
    objects: {
      region: Prisma.$RegionPayload<ExtArgs>
      roomTypes: Prisma.$RoomTypeConfigPayload<ExtArgs>[]
      routesFrom: Prisma.$RoutePayload<ExtArgs>[]
      routesTo: Prisma.$RoutePayload<ExtArgs>[]
      availability: Prisma.$AvailabilityCheckPayload<ExtArgs>[]
      tourHuts: Prisma.$TourHutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      osmId: bigint | null
      name: string
      altitude: number
      lat: number
      lng: number
      capacity: number
      operator: string | null
      website: string | null
      phone: string | null
      email: string | null
      openingHours: string | null
      bookingUrl: string | null
      bookingSystem: $Enums.BookingSystem
      imageUrl: string | null
      description: string | null
      amenities: string[]
      dataSource: $Enums.DataSource
      regionId: string
    }, ExtArgs["result"]["hut"]>
    composites: {}
  }

  type HutGetPayload<S extends boolean | null | undefined | HutDefaultArgs> = $Result.GetResult<Prisma.$HutPayload, S>

  type HutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HutCountAggregateInputType | true
    }

  export interface HutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hut'], meta: { name: 'Hut' } }
    /**
     * Find zero or one Hut that matches the filter.
     * @param {HutFindUniqueArgs} args - Arguments to find a Hut
     * @example
     * // Get one Hut
     * const hut = await prisma.hut.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HutFindUniqueArgs>(args: SelectSubset<T, HutFindUniqueArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hut that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HutFindUniqueOrThrowArgs} args - Arguments to find a Hut
     * @example
     * // Get one Hut
     * const hut = await prisma.hut.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HutFindUniqueOrThrowArgs>(args: SelectSubset<T, HutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hut that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HutFindFirstArgs} args - Arguments to find a Hut
     * @example
     * // Get one Hut
     * const hut = await prisma.hut.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HutFindFirstArgs>(args?: SelectSubset<T, HutFindFirstArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hut that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HutFindFirstOrThrowArgs} args - Arguments to find a Hut
     * @example
     * // Get one Hut
     * const hut = await prisma.hut.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HutFindFirstOrThrowArgs>(args?: SelectSubset<T, HutFindFirstOrThrowArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Huts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Huts
     * const huts = await prisma.hut.findMany()
     * 
     * // Get first 10 Huts
     * const huts = await prisma.hut.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hutWithIdOnly = await prisma.hut.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HutFindManyArgs>(args?: SelectSubset<T, HutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hut.
     * @param {HutCreateArgs} args - Arguments to create a Hut.
     * @example
     * // Create one Hut
     * const Hut = await prisma.hut.create({
     *   data: {
     *     // ... data to create a Hut
     *   }
     * })
     * 
     */
    create<T extends HutCreateArgs>(args: SelectSubset<T, HutCreateArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Huts.
     * @param {HutCreateManyArgs} args - Arguments to create many Huts.
     * @example
     * // Create many Huts
     * const hut = await prisma.hut.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HutCreateManyArgs>(args?: SelectSubset<T, HutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Huts and returns the data saved in the database.
     * @param {HutCreateManyAndReturnArgs} args - Arguments to create many Huts.
     * @example
     * // Create many Huts
     * const hut = await prisma.hut.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Huts and only return the `id`
     * const hutWithIdOnly = await prisma.hut.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HutCreateManyAndReturnArgs>(args?: SelectSubset<T, HutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hut.
     * @param {HutDeleteArgs} args - Arguments to delete one Hut.
     * @example
     * // Delete one Hut
     * const Hut = await prisma.hut.delete({
     *   where: {
     *     // ... filter to delete one Hut
     *   }
     * })
     * 
     */
    delete<T extends HutDeleteArgs>(args: SelectSubset<T, HutDeleteArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hut.
     * @param {HutUpdateArgs} args - Arguments to update one Hut.
     * @example
     * // Update one Hut
     * const hut = await prisma.hut.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HutUpdateArgs>(args: SelectSubset<T, HutUpdateArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Huts.
     * @param {HutDeleteManyArgs} args - Arguments to filter Huts to delete.
     * @example
     * // Delete a few Huts
     * const { count } = await prisma.hut.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HutDeleteManyArgs>(args?: SelectSubset<T, HutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Huts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Huts
     * const hut = await prisma.hut.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HutUpdateManyArgs>(args: SelectSubset<T, HutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Huts and returns the data updated in the database.
     * @param {HutUpdateManyAndReturnArgs} args - Arguments to update many Huts.
     * @example
     * // Update many Huts
     * const hut = await prisma.hut.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Huts and only return the `id`
     * const hutWithIdOnly = await prisma.hut.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HutUpdateManyAndReturnArgs>(args: SelectSubset<T, HutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hut.
     * @param {HutUpsertArgs} args - Arguments to update or create a Hut.
     * @example
     * // Update or create a Hut
     * const hut = await prisma.hut.upsert({
     *   create: {
     *     // ... data to create a Hut
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hut we want to update
     *   }
     * })
     */
    upsert<T extends HutUpsertArgs>(args: SelectSubset<T, HutUpsertArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Huts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HutCountArgs} args - Arguments to filter Huts to count.
     * @example
     * // Count the number of Huts
     * const count = await prisma.hut.count({
     *   where: {
     *     // ... the filter for the Huts we want to count
     *   }
     * })
    **/
    count<T extends HutCountArgs>(
      args?: Subset<T, HutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hut.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HutAggregateArgs>(args: Subset<T, HutAggregateArgs>): Prisma.PrismaPromise<GetHutAggregateType<T>>

    /**
     * Group by Hut.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HutGroupByArgs['orderBy'] }
        : { orderBy?: HutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hut model
   */
  readonly fields: HutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hut.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    roomTypes<T extends Hut$roomTypesArgs<ExtArgs> = {}>(args?: Subset<T, Hut$roomTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routesFrom<T extends Hut$routesFromArgs<ExtArgs> = {}>(args?: Subset<T, Hut$routesFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routesTo<T extends Hut$routesToArgs<ExtArgs> = {}>(args?: Subset<T, Hut$routesToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    availability<T extends Hut$availabilityArgs<ExtArgs> = {}>(args?: Subset<T, Hut$availabilityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tourHuts<T extends Hut$tourHutsArgs<ExtArgs> = {}>(args?: Subset<T, Hut$tourHutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hut model
   */
  interface HutFieldRefs {
    readonly id: FieldRef<"Hut", 'String'>
    readonly osmId: FieldRef<"Hut", 'BigInt'>
    readonly name: FieldRef<"Hut", 'String'>
    readonly altitude: FieldRef<"Hut", 'Int'>
    readonly lat: FieldRef<"Hut", 'Float'>
    readonly lng: FieldRef<"Hut", 'Float'>
    readonly capacity: FieldRef<"Hut", 'Int'>
    readonly operator: FieldRef<"Hut", 'String'>
    readonly website: FieldRef<"Hut", 'String'>
    readonly phone: FieldRef<"Hut", 'String'>
    readonly email: FieldRef<"Hut", 'String'>
    readonly openingHours: FieldRef<"Hut", 'String'>
    readonly bookingUrl: FieldRef<"Hut", 'String'>
    readonly bookingSystem: FieldRef<"Hut", 'BookingSystem'>
    readonly imageUrl: FieldRef<"Hut", 'String'>
    readonly description: FieldRef<"Hut", 'String'>
    readonly amenities: FieldRef<"Hut", 'String[]'>
    readonly dataSource: FieldRef<"Hut", 'DataSource'>
    readonly regionId: FieldRef<"Hut", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Hut findUnique
   */
  export type HutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * Filter, which Hut to fetch.
     */
    where: HutWhereUniqueInput
  }

  /**
   * Hut findUniqueOrThrow
   */
  export type HutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * Filter, which Hut to fetch.
     */
    where: HutWhereUniqueInput
  }

  /**
   * Hut findFirst
   */
  export type HutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * Filter, which Hut to fetch.
     */
    where?: HutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Huts to fetch.
     */
    orderBy?: HutOrderByWithRelationInput | HutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Huts.
     */
    cursor?: HutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Huts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Huts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Huts.
     */
    distinct?: HutScalarFieldEnum | HutScalarFieldEnum[]
  }

  /**
   * Hut findFirstOrThrow
   */
  export type HutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * Filter, which Hut to fetch.
     */
    where?: HutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Huts to fetch.
     */
    orderBy?: HutOrderByWithRelationInput | HutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Huts.
     */
    cursor?: HutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Huts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Huts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Huts.
     */
    distinct?: HutScalarFieldEnum | HutScalarFieldEnum[]
  }

  /**
   * Hut findMany
   */
  export type HutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * Filter, which Huts to fetch.
     */
    where?: HutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Huts to fetch.
     */
    orderBy?: HutOrderByWithRelationInput | HutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Huts.
     */
    cursor?: HutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Huts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Huts.
     */
    skip?: number
    distinct?: HutScalarFieldEnum | HutScalarFieldEnum[]
  }

  /**
   * Hut create
   */
  export type HutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * The data needed to create a Hut.
     */
    data: XOR<HutCreateInput, HutUncheckedCreateInput>
  }

  /**
   * Hut createMany
   */
  export type HutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Huts.
     */
    data: HutCreateManyInput | HutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hut createManyAndReturn
   */
  export type HutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * The data used to create many Huts.
     */
    data: HutCreateManyInput | HutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hut update
   */
  export type HutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * The data needed to update a Hut.
     */
    data: XOR<HutUpdateInput, HutUncheckedUpdateInput>
    /**
     * Choose, which Hut to update.
     */
    where: HutWhereUniqueInput
  }

  /**
   * Hut updateMany
   */
  export type HutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Huts.
     */
    data: XOR<HutUpdateManyMutationInput, HutUncheckedUpdateManyInput>
    /**
     * Filter which Huts to update
     */
    where?: HutWhereInput
    /**
     * Limit how many Huts to update.
     */
    limit?: number
  }

  /**
   * Hut updateManyAndReturn
   */
  export type HutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * The data used to update Huts.
     */
    data: XOR<HutUpdateManyMutationInput, HutUncheckedUpdateManyInput>
    /**
     * Filter which Huts to update
     */
    where?: HutWhereInput
    /**
     * Limit how many Huts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hut upsert
   */
  export type HutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * The filter to search for the Hut to update in case it exists.
     */
    where: HutWhereUniqueInput
    /**
     * In case the Hut found by the `where` argument doesn't exist, create a new Hut with this data.
     */
    create: XOR<HutCreateInput, HutUncheckedCreateInput>
    /**
     * In case the Hut was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HutUpdateInput, HutUncheckedUpdateInput>
  }

  /**
   * Hut delete
   */
  export type HutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
    /**
     * Filter which Hut to delete.
     */
    where: HutWhereUniqueInput
  }

  /**
   * Hut deleteMany
   */
  export type HutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Huts to delete
     */
    where?: HutWhereInput
    /**
     * Limit how many Huts to delete.
     */
    limit?: number
  }

  /**
   * Hut.roomTypes
   */
  export type Hut$roomTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    where?: RoomTypeConfigWhereInput
    orderBy?: RoomTypeConfigOrderByWithRelationInput | RoomTypeConfigOrderByWithRelationInput[]
    cursor?: RoomTypeConfigWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomTypeConfigScalarFieldEnum | RoomTypeConfigScalarFieldEnum[]
  }

  /**
   * Hut.routesFrom
   */
  export type Hut$routesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    cursor?: RouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Hut.routesTo
   */
  export type Hut$routesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    cursor?: RouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Hut.availability
   */
  export type Hut$availabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    where?: AvailabilityCheckWhereInput
    orderBy?: AvailabilityCheckOrderByWithRelationInput | AvailabilityCheckOrderByWithRelationInput[]
    cursor?: AvailabilityCheckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvailabilityCheckScalarFieldEnum | AvailabilityCheckScalarFieldEnum[]
  }

  /**
   * Hut.tourHuts
   */
  export type Hut$tourHutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    where?: TourHutWhereInput
    orderBy?: TourHutOrderByWithRelationInput | TourHutOrderByWithRelationInput[]
    cursor?: TourHutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TourHutScalarFieldEnum | TourHutScalarFieldEnum[]
  }

  /**
   * Hut without action
   */
  export type HutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hut
     */
    select?: HutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hut
     */
    omit?: HutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HutInclude<ExtArgs> | null
  }


  /**
   * Model RoomTypeConfig
   */

  export type AggregateRoomTypeConfig = {
    _count: RoomTypeConfigCountAggregateOutputType | null
    _avg: RoomTypeConfigAvgAggregateOutputType | null
    _sum: RoomTypeConfigSumAggregateOutputType | null
    _min: RoomTypeConfigMinAggregateOutputType | null
    _max: RoomTypeConfigMaxAggregateOutputType | null
  }

  export type RoomTypeConfigAvgAggregateOutputType = {
    count: number | null
  }

  export type RoomTypeConfigSumAggregateOutputType = {
    count: number | null
  }

  export type RoomTypeConfigMinAggregateOutputType = {
    id: string | null
    hutId: string | null
    type: $Enums.RoomType | null
    count: number | null
  }

  export type RoomTypeConfigMaxAggregateOutputType = {
    id: string | null
    hutId: string | null
    type: $Enums.RoomType | null
    count: number | null
  }

  export type RoomTypeConfigCountAggregateOutputType = {
    id: number
    hutId: number
    type: number
    count: number
    _all: number
  }


  export type RoomTypeConfigAvgAggregateInputType = {
    count?: true
  }

  export type RoomTypeConfigSumAggregateInputType = {
    count?: true
  }

  export type RoomTypeConfigMinAggregateInputType = {
    id?: true
    hutId?: true
    type?: true
    count?: true
  }

  export type RoomTypeConfigMaxAggregateInputType = {
    id?: true
    hutId?: true
    type?: true
    count?: true
  }

  export type RoomTypeConfigCountAggregateInputType = {
    id?: true
    hutId?: true
    type?: true
    count?: true
    _all?: true
  }

  export type RoomTypeConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomTypeConfig to aggregate.
     */
    where?: RoomTypeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypeConfigs to fetch.
     */
    orderBy?: RoomTypeConfigOrderByWithRelationInput | RoomTypeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomTypeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomTypeConfigs
    **/
    _count?: true | RoomTypeConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomTypeConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomTypeConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomTypeConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomTypeConfigMaxAggregateInputType
  }

  export type GetRoomTypeConfigAggregateType<T extends RoomTypeConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomTypeConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomTypeConfig[P]>
      : GetScalarType<T[P], AggregateRoomTypeConfig[P]>
  }




  export type RoomTypeConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomTypeConfigWhereInput
    orderBy?: RoomTypeConfigOrderByWithAggregationInput | RoomTypeConfigOrderByWithAggregationInput[]
    by: RoomTypeConfigScalarFieldEnum[] | RoomTypeConfigScalarFieldEnum
    having?: RoomTypeConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomTypeConfigCountAggregateInputType | true
    _avg?: RoomTypeConfigAvgAggregateInputType
    _sum?: RoomTypeConfigSumAggregateInputType
    _min?: RoomTypeConfigMinAggregateInputType
    _max?: RoomTypeConfigMaxAggregateInputType
  }

  export type RoomTypeConfigGroupByOutputType = {
    id: string
    hutId: string
    type: $Enums.RoomType
    count: number
    _count: RoomTypeConfigCountAggregateOutputType | null
    _avg: RoomTypeConfigAvgAggregateOutputType | null
    _sum: RoomTypeConfigSumAggregateOutputType | null
    _min: RoomTypeConfigMinAggregateOutputType | null
    _max: RoomTypeConfigMaxAggregateOutputType | null
  }

  type GetRoomTypeConfigGroupByPayload<T extends RoomTypeConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomTypeConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomTypeConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomTypeConfigGroupByOutputType[P]>
            : GetScalarType<T[P], RoomTypeConfigGroupByOutputType[P]>
        }
      >
    >


  export type RoomTypeConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hutId?: boolean
    type?: boolean
    count?: boolean
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomTypeConfig"]>

  export type RoomTypeConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hutId?: boolean
    type?: boolean
    count?: boolean
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomTypeConfig"]>

  export type RoomTypeConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hutId?: boolean
    type?: boolean
    count?: boolean
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomTypeConfig"]>

  export type RoomTypeConfigSelectScalar = {
    id?: boolean
    hutId?: boolean
    type?: boolean
    count?: boolean
  }

  export type RoomTypeConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hutId" | "type" | "count", ExtArgs["result"]["roomTypeConfig"]>
  export type RoomTypeConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type RoomTypeConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type RoomTypeConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }

  export type $RoomTypeConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomTypeConfig"
    objects: {
      hut: Prisma.$HutPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hutId: string
      type: $Enums.RoomType
      count: number
    }, ExtArgs["result"]["roomTypeConfig"]>
    composites: {}
  }

  type RoomTypeConfigGetPayload<S extends boolean | null | undefined | RoomTypeConfigDefaultArgs> = $Result.GetResult<Prisma.$RoomTypeConfigPayload, S>

  type RoomTypeConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomTypeConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomTypeConfigCountAggregateInputType | true
    }

  export interface RoomTypeConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomTypeConfig'], meta: { name: 'RoomTypeConfig' } }
    /**
     * Find zero or one RoomTypeConfig that matches the filter.
     * @param {RoomTypeConfigFindUniqueArgs} args - Arguments to find a RoomTypeConfig
     * @example
     * // Get one RoomTypeConfig
     * const roomTypeConfig = await prisma.roomTypeConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomTypeConfigFindUniqueArgs>(args: SelectSubset<T, RoomTypeConfigFindUniqueArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomTypeConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomTypeConfigFindUniqueOrThrowArgs} args - Arguments to find a RoomTypeConfig
     * @example
     * // Get one RoomTypeConfig
     * const roomTypeConfig = await prisma.roomTypeConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomTypeConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomTypeConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomTypeConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeConfigFindFirstArgs} args - Arguments to find a RoomTypeConfig
     * @example
     * // Get one RoomTypeConfig
     * const roomTypeConfig = await prisma.roomTypeConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomTypeConfigFindFirstArgs>(args?: SelectSubset<T, RoomTypeConfigFindFirstArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomTypeConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeConfigFindFirstOrThrowArgs} args - Arguments to find a RoomTypeConfig
     * @example
     * // Get one RoomTypeConfig
     * const roomTypeConfig = await prisma.roomTypeConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomTypeConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomTypeConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomTypeConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomTypeConfigs
     * const roomTypeConfigs = await prisma.roomTypeConfig.findMany()
     * 
     * // Get first 10 RoomTypeConfigs
     * const roomTypeConfigs = await prisma.roomTypeConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomTypeConfigWithIdOnly = await prisma.roomTypeConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomTypeConfigFindManyArgs>(args?: SelectSubset<T, RoomTypeConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomTypeConfig.
     * @param {RoomTypeConfigCreateArgs} args - Arguments to create a RoomTypeConfig.
     * @example
     * // Create one RoomTypeConfig
     * const RoomTypeConfig = await prisma.roomTypeConfig.create({
     *   data: {
     *     // ... data to create a RoomTypeConfig
     *   }
     * })
     * 
     */
    create<T extends RoomTypeConfigCreateArgs>(args: SelectSubset<T, RoomTypeConfigCreateArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomTypeConfigs.
     * @param {RoomTypeConfigCreateManyArgs} args - Arguments to create many RoomTypeConfigs.
     * @example
     * // Create many RoomTypeConfigs
     * const roomTypeConfig = await prisma.roomTypeConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomTypeConfigCreateManyArgs>(args?: SelectSubset<T, RoomTypeConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomTypeConfigs and returns the data saved in the database.
     * @param {RoomTypeConfigCreateManyAndReturnArgs} args - Arguments to create many RoomTypeConfigs.
     * @example
     * // Create many RoomTypeConfigs
     * const roomTypeConfig = await prisma.roomTypeConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomTypeConfigs and only return the `id`
     * const roomTypeConfigWithIdOnly = await prisma.roomTypeConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomTypeConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomTypeConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomTypeConfig.
     * @param {RoomTypeConfigDeleteArgs} args - Arguments to delete one RoomTypeConfig.
     * @example
     * // Delete one RoomTypeConfig
     * const RoomTypeConfig = await prisma.roomTypeConfig.delete({
     *   where: {
     *     // ... filter to delete one RoomTypeConfig
     *   }
     * })
     * 
     */
    delete<T extends RoomTypeConfigDeleteArgs>(args: SelectSubset<T, RoomTypeConfigDeleteArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomTypeConfig.
     * @param {RoomTypeConfigUpdateArgs} args - Arguments to update one RoomTypeConfig.
     * @example
     * // Update one RoomTypeConfig
     * const roomTypeConfig = await prisma.roomTypeConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomTypeConfigUpdateArgs>(args: SelectSubset<T, RoomTypeConfigUpdateArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomTypeConfigs.
     * @param {RoomTypeConfigDeleteManyArgs} args - Arguments to filter RoomTypeConfigs to delete.
     * @example
     * // Delete a few RoomTypeConfigs
     * const { count } = await prisma.roomTypeConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomTypeConfigDeleteManyArgs>(args?: SelectSubset<T, RoomTypeConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomTypeConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomTypeConfigs
     * const roomTypeConfig = await prisma.roomTypeConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomTypeConfigUpdateManyArgs>(args: SelectSubset<T, RoomTypeConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomTypeConfigs and returns the data updated in the database.
     * @param {RoomTypeConfigUpdateManyAndReturnArgs} args - Arguments to update many RoomTypeConfigs.
     * @example
     * // Update many RoomTypeConfigs
     * const roomTypeConfig = await prisma.roomTypeConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomTypeConfigs and only return the `id`
     * const roomTypeConfigWithIdOnly = await prisma.roomTypeConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomTypeConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomTypeConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomTypeConfig.
     * @param {RoomTypeConfigUpsertArgs} args - Arguments to update or create a RoomTypeConfig.
     * @example
     * // Update or create a RoomTypeConfig
     * const roomTypeConfig = await prisma.roomTypeConfig.upsert({
     *   create: {
     *     // ... data to create a RoomTypeConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomTypeConfig we want to update
     *   }
     * })
     */
    upsert<T extends RoomTypeConfigUpsertArgs>(args: SelectSubset<T, RoomTypeConfigUpsertArgs<ExtArgs>>): Prisma__RoomTypeConfigClient<$Result.GetResult<Prisma.$RoomTypeConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomTypeConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeConfigCountArgs} args - Arguments to filter RoomTypeConfigs to count.
     * @example
     * // Count the number of RoomTypeConfigs
     * const count = await prisma.roomTypeConfig.count({
     *   where: {
     *     // ... the filter for the RoomTypeConfigs we want to count
     *   }
     * })
    **/
    count<T extends RoomTypeConfigCountArgs>(
      args?: Subset<T, RoomTypeConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomTypeConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomTypeConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomTypeConfigAggregateArgs>(args: Subset<T, RoomTypeConfigAggregateArgs>): Prisma.PrismaPromise<GetRoomTypeConfigAggregateType<T>>

    /**
     * Group by RoomTypeConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomTypeConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomTypeConfigGroupByArgs['orderBy'] }
        : { orderBy?: RoomTypeConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomTypeConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomTypeConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomTypeConfig model
   */
  readonly fields: RoomTypeConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomTypeConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomTypeConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hut<T extends HutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HutDefaultArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomTypeConfig model
   */
  interface RoomTypeConfigFieldRefs {
    readonly id: FieldRef<"RoomTypeConfig", 'String'>
    readonly hutId: FieldRef<"RoomTypeConfig", 'String'>
    readonly type: FieldRef<"RoomTypeConfig", 'RoomType'>
    readonly count: FieldRef<"RoomTypeConfig", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RoomTypeConfig findUnique
   */
  export type RoomTypeConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypeConfig to fetch.
     */
    where: RoomTypeConfigWhereUniqueInput
  }

  /**
   * RoomTypeConfig findUniqueOrThrow
   */
  export type RoomTypeConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypeConfig to fetch.
     */
    where: RoomTypeConfigWhereUniqueInput
  }

  /**
   * RoomTypeConfig findFirst
   */
  export type RoomTypeConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypeConfig to fetch.
     */
    where?: RoomTypeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypeConfigs to fetch.
     */
    orderBy?: RoomTypeConfigOrderByWithRelationInput | RoomTypeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypeConfigs.
     */
    cursor?: RoomTypeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypeConfigs.
     */
    distinct?: RoomTypeConfigScalarFieldEnum | RoomTypeConfigScalarFieldEnum[]
  }

  /**
   * RoomTypeConfig findFirstOrThrow
   */
  export type RoomTypeConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypeConfig to fetch.
     */
    where?: RoomTypeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypeConfigs to fetch.
     */
    orderBy?: RoomTypeConfigOrderByWithRelationInput | RoomTypeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypeConfigs.
     */
    cursor?: RoomTypeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypeConfigs.
     */
    distinct?: RoomTypeConfigScalarFieldEnum | RoomTypeConfigScalarFieldEnum[]
  }

  /**
   * RoomTypeConfig findMany
   */
  export type RoomTypeConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypeConfigs to fetch.
     */
    where?: RoomTypeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypeConfigs to fetch.
     */
    orderBy?: RoomTypeConfigOrderByWithRelationInput | RoomTypeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomTypeConfigs.
     */
    cursor?: RoomTypeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypeConfigs.
     */
    skip?: number
    distinct?: RoomTypeConfigScalarFieldEnum | RoomTypeConfigScalarFieldEnum[]
  }

  /**
   * RoomTypeConfig create
   */
  export type RoomTypeConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomTypeConfig.
     */
    data: XOR<RoomTypeConfigCreateInput, RoomTypeConfigUncheckedCreateInput>
  }

  /**
   * RoomTypeConfig createMany
   */
  export type RoomTypeConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomTypeConfigs.
     */
    data: RoomTypeConfigCreateManyInput | RoomTypeConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomTypeConfig createManyAndReturn
   */
  export type RoomTypeConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * The data used to create many RoomTypeConfigs.
     */
    data: RoomTypeConfigCreateManyInput | RoomTypeConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomTypeConfig update
   */
  export type RoomTypeConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomTypeConfig.
     */
    data: XOR<RoomTypeConfigUpdateInput, RoomTypeConfigUncheckedUpdateInput>
    /**
     * Choose, which RoomTypeConfig to update.
     */
    where: RoomTypeConfigWhereUniqueInput
  }

  /**
   * RoomTypeConfig updateMany
   */
  export type RoomTypeConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomTypeConfigs.
     */
    data: XOR<RoomTypeConfigUpdateManyMutationInput, RoomTypeConfigUncheckedUpdateManyInput>
    /**
     * Filter which RoomTypeConfigs to update
     */
    where?: RoomTypeConfigWhereInput
    /**
     * Limit how many RoomTypeConfigs to update.
     */
    limit?: number
  }

  /**
   * RoomTypeConfig updateManyAndReturn
   */
  export type RoomTypeConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * The data used to update RoomTypeConfigs.
     */
    data: XOR<RoomTypeConfigUpdateManyMutationInput, RoomTypeConfigUncheckedUpdateManyInput>
    /**
     * Filter which RoomTypeConfigs to update
     */
    where?: RoomTypeConfigWhereInput
    /**
     * Limit how many RoomTypeConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomTypeConfig upsert
   */
  export type RoomTypeConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomTypeConfig to update in case it exists.
     */
    where: RoomTypeConfigWhereUniqueInput
    /**
     * In case the RoomTypeConfig found by the `where` argument doesn't exist, create a new RoomTypeConfig with this data.
     */
    create: XOR<RoomTypeConfigCreateInput, RoomTypeConfigUncheckedCreateInput>
    /**
     * In case the RoomTypeConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomTypeConfigUpdateInput, RoomTypeConfigUncheckedUpdateInput>
  }

  /**
   * RoomTypeConfig delete
   */
  export type RoomTypeConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
    /**
     * Filter which RoomTypeConfig to delete.
     */
    where: RoomTypeConfigWhereUniqueInput
  }

  /**
   * RoomTypeConfig deleteMany
   */
  export type RoomTypeConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomTypeConfigs to delete
     */
    where?: RoomTypeConfigWhereInput
    /**
     * Limit how many RoomTypeConfigs to delete.
     */
    limit?: number
  }

  /**
   * RoomTypeConfig without action
   */
  export type RoomTypeConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeConfig
     */
    select?: RoomTypeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomTypeConfig
     */
    omit?: RoomTypeConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeConfigInclude<ExtArgs> | null
  }


  /**
   * Model Route
   */

  export type AggregateRoute = {
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  export type RouteAvgAggregateOutputType = {
    distance: number | null
    ascent: number | null
    descent: number | null
    estimatedDuration: number | null
  }

  export type RouteSumAggregateOutputType = {
    distance: number | null
    ascent: number | null
    descent: number | null
    estimatedDuration: number | null
  }

  export type RouteMinAggregateOutputType = {
    id: string | null
    fromHutId: string | null
    toHutId: string | null
    distance: number | null
    ascent: number | null
    descent: number | null
    estimatedDuration: number | null
    difficulty: $Enums.Difficulty | null
    dataSource: $Enums.DataSource | null
  }

  export type RouteMaxAggregateOutputType = {
    id: string | null
    fromHutId: string | null
    toHutId: string | null
    distance: number | null
    ascent: number | null
    descent: number | null
    estimatedDuration: number | null
    difficulty: $Enums.Difficulty | null
    dataSource: $Enums.DataSource | null
  }

  export type RouteCountAggregateOutputType = {
    id: number
    fromHutId: number
    toHutId: number
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: number
    dataSource: number
    gpxTrack: number
    _all: number
  }


  export type RouteAvgAggregateInputType = {
    distance?: true
    ascent?: true
    descent?: true
    estimatedDuration?: true
  }

  export type RouteSumAggregateInputType = {
    distance?: true
    ascent?: true
    descent?: true
    estimatedDuration?: true
  }

  export type RouteMinAggregateInputType = {
    id?: true
    fromHutId?: true
    toHutId?: true
    distance?: true
    ascent?: true
    descent?: true
    estimatedDuration?: true
    difficulty?: true
    dataSource?: true
  }

  export type RouteMaxAggregateInputType = {
    id?: true
    fromHutId?: true
    toHutId?: true
    distance?: true
    ascent?: true
    descent?: true
    estimatedDuration?: true
    difficulty?: true
    dataSource?: true
  }

  export type RouteCountAggregateInputType = {
    id?: true
    fromHutId?: true
    toHutId?: true
    distance?: true
    ascent?: true
    descent?: true
    estimatedDuration?: true
    difficulty?: true
    dataSource?: true
    gpxTrack?: true
    _all?: true
  }

  export type RouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Route to aggregate.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Routes
    **/
    _count?: true | RouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RouteMaxAggregateInputType
  }

  export type GetRouteAggregateType<T extends RouteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoute[P]>
      : GetScalarType<T[P], AggregateRoute[P]>
  }




  export type RouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithAggregationInput | RouteOrderByWithAggregationInput[]
    by: RouteScalarFieldEnum[] | RouteScalarFieldEnum
    having?: RouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RouteCountAggregateInputType | true
    _avg?: RouteAvgAggregateInputType
    _sum?: RouteSumAggregateInputType
    _min?: RouteMinAggregateInputType
    _max?: RouteMaxAggregateInputType
  }

  export type RouteGroupByOutputType = {
    id: string
    fromHutId: string
    toHutId: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource: $Enums.DataSource
    gpxTrack: JsonValue | null
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  type GetRouteGroupByPayload<T extends RouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RouteGroupByOutputType[P]>
            : GetScalarType<T[P], RouteGroupByOutputType[P]>
        }
      >
    >


  export type RouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromHutId?: boolean
    toHutId?: boolean
    distance?: boolean
    ascent?: boolean
    descent?: boolean
    estimatedDuration?: boolean
    difficulty?: boolean
    dataSource?: boolean
    gpxTrack?: boolean
    fromHut?: boolean | HutDefaultArgs<ExtArgs>
    toHut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromHutId?: boolean
    toHutId?: boolean
    distance?: boolean
    ascent?: boolean
    descent?: boolean
    estimatedDuration?: boolean
    difficulty?: boolean
    dataSource?: boolean
    gpxTrack?: boolean
    fromHut?: boolean | HutDefaultArgs<ExtArgs>
    toHut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromHutId?: boolean
    toHutId?: boolean
    distance?: boolean
    ascent?: boolean
    descent?: boolean
    estimatedDuration?: boolean
    difficulty?: boolean
    dataSource?: boolean
    gpxTrack?: boolean
    fromHut?: boolean | HutDefaultArgs<ExtArgs>
    toHut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectScalar = {
    id?: boolean
    fromHutId?: boolean
    toHutId?: boolean
    distance?: boolean
    ascent?: boolean
    descent?: boolean
    estimatedDuration?: boolean
    difficulty?: boolean
    dataSource?: boolean
    gpxTrack?: boolean
  }

  export type RouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromHutId" | "toHutId" | "distance" | "ascent" | "descent" | "estimatedDuration" | "difficulty" | "dataSource" | "gpxTrack", ExtArgs["result"]["route"]>
  export type RouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromHut?: boolean | HutDefaultArgs<ExtArgs>
    toHut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type RouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromHut?: boolean | HutDefaultArgs<ExtArgs>
    toHut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type RouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromHut?: boolean | HutDefaultArgs<ExtArgs>
    toHut?: boolean | HutDefaultArgs<ExtArgs>
  }

  export type $RoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Route"
    objects: {
      fromHut: Prisma.$HutPayload<ExtArgs>
      toHut: Prisma.$HutPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromHutId: string
      toHutId: string
      distance: number
      ascent: number
      descent: number
      estimatedDuration: number
      difficulty: $Enums.Difficulty
      dataSource: $Enums.DataSource
      gpxTrack: Prisma.JsonValue | null
    }, ExtArgs["result"]["route"]>
    composites: {}
  }

  type RouteGetPayload<S extends boolean | null | undefined | RouteDefaultArgs> = $Result.GetResult<Prisma.$RoutePayload, S>

  type RouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RouteCountAggregateInputType | true
    }

  export interface RouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Route'], meta: { name: 'Route' } }
    /**
     * Find zero or one Route that matches the filter.
     * @param {RouteFindUniqueArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouteFindUniqueArgs>(args: SelectSubset<T, RouteFindUniqueArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Route that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RouteFindUniqueOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouteFindUniqueOrThrowArgs>(args: SelectSubset<T, RouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouteFindFirstArgs>(args?: SelectSubset<T, RouteFindFirstArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouteFindFirstOrThrowArgs>(args?: SelectSubset<T, RouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Routes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routes
     * const routes = await prisma.route.findMany()
     * 
     * // Get first 10 Routes
     * const routes = await prisma.route.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routeWithIdOnly = await prisma.route.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RouteFindManyArgs>(args?: SelectSubset<T, RouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Route.
     * @param {RouteCreateArgs} args - Arguments to create a Route.
     * @example
     * // Create one Route
     * const Route = await prisma.route.create({
     *   data: {
     *     // ... data to create a Route
     *   }
     * })
     * 
     */
    create<T extends RouteCreateArgs>(args: SelectSubset<T, RouteCreateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Routes.
     * @param {RouteCreateManyArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RouteCreateManyArgs>(args?: SelectSubset<T, RouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Routes and returns the data saved in the database.
     * @param {RouteCreateManyAndReturnArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RouteCreateManyAndReturnArgs>(args?: SelectSubset<T, RouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Route.
     * @param {RouteDeleteArgs} args - Arguments to delete one Route.
     * @example
     * // Delete one Route
     * const Route = await prisma.route.delete({
     *   where: {
     *     // ... filter to delete one Route
     *   }
     * })
     * 
     */
    delete<T extends RouteDeleteArgs>(args: SelectSubset<T, RouteDeleteArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Route.
     * @param {RouteUpdateArgs} args - Arguments to update one Route.
     * @example
     * // Update one Route
     * const route = await prisma.route.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RouteUpdateArgs>(args: SelectSubset<T, RouteUpdateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Routes.
     * @param {RouteDeleteManyArgs} args - Arguments to filter Routes to delete.
     * @example
     * // Delete a few Routes
     * const { count } = await prisma.route.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RouteDeleteManyArgs>(args?: SelectSubset<T, RouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RouteUpdateManyArgs>(args: SelectSubset<T, RouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes and returns the data updated in the database.
     * @param {RouteUpdateManyAndReturnArgs} args - Arguments to update many Routes.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RouteUpdateManyAndReturnArgs>(args: SelectSubset<T, RouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Route.
     * @param {RouteUpsertArgs} args - Arguments to update or create a Route.
     * @example
     * // Update or create a Route
     * const route = await prisma.route.upsert({
     *   create: {
     *     // ... data to create a Route
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Route we want to update
     *   }
     * })
     */
    upsert<T extends RouteUpsertArgs>(args: SelectSubset<T, RouteUpsertArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteCountArgs} args - Arguments to filter Routes to count.
     * @example
     * // Count the number of Routes
     * const count = await prisma.route.count({
     *   where: {
     *     // ... the filter for the Routes we want to count
     *   }
     * })
    **/
    count<T extends RouteCountArgs>(
      args?: Subset<T, RouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RouteAggregateArgs>(args: Subset<T, RouteAggregateArgs>): Prisma.PrismaPromise<GetRouteAggregateType<T>>

    /**
     * Group by Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RouteGroupByArgs['orderBy'] }
        : { orderBy?: RouteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Route model
   */
  readonly fields: RouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Route.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromHut<T extends HutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HutDefaultArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toHut<T extends HutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HutDefaultArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Route model
   */
  interface RouteFieldRefs {
    readonly id: FieldRef<"Route", 'String'>
    readonly fromHutId: FieldRef<"Route", 'String'>
    readonly toHutId: FieldRef<"Route", 'String'>
    readonly distance: FieldRef<"Route", 'Float'>
    readonly ascent: FieldRef<"Route", 'Int'>
    readonly descent: FieldRef<"Route", 'Int'>
    readonly estimatedDuration: FieldRef<"Route", 'Float'>
    readonly difficulty: FieldRef<"Route", 'Difficulty'>
    readonly dataSource: FieldRef<"Route", 'DataSource'>
    readonly gpxTrack: FieldRef<"Route", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Route findUnique
   */
  export type RouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findUniqueOrThrow
   */
  export type RouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findFirst
   */
  export type RouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findFirstOrThrow
   */
  export type RouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findMany
   */
  export type RouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Routes to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route create
   */
  export type RouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to create a Route.
     */
    data: XOR<RouteCreateInput, RouteUncheckedCreateInput>
  }

  /**
   * Route createMany
   */
  export type RouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Route createManyAndReturn
   */
  export type RouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Route update
   */
  export type RouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to update a Route.
     */
    data: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
    /**
     * Choose, which Route to update.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route updateMany
   */
  export type RouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
  }

  /**
   * Route updateManyAndReturn
   */
  export type RouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Route upsert
   */
  export type RouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The filter to search for the Route to update in case it exists.
     */
    where: RouteWhereUniqueInput
    /**
     * In case the Route found by the `where` argument doesn't exist, create a new Route with this data.
     */
    create: XOR<RouteCreateInput, RouteUncheckedCreateInput>
    /**
     * In case the Route was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
  }

  /**
   * Route delete
   */
  export type RouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter which Route to delete.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route deleteMany
   */
  export type RouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Routes to delete
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to delete.
     */
    limit?: number
  }

  /**
   * Route without action
   */
  export type RouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
  }


  /**
   * Model Tour
   */

  export type AggregateTour = {
    _count: TourCountAggregateOutputType | null
    _avg: TourAvgAggregateOutputType | null
    _sum: TourSumAggregateOutputType | null
    _min: TourMinAggregateOutputType | null
    _max: TourMaxAggregateOutputType | null
  }

  export type TourAvgAggregateOutputType = {
    groupSize: number | null
    totalDays: number | null
    restDays: number | null
    maxBedsPerRoom: number | null
    minDistancePerDay: number | null
    maxDistancePerDay: number | null
    maxAscentPerDay: number | null
  }

  export type TourSumAggregateOutputType = {
    groupSize: number | null
    totalDays: number | null
    restDays: number | null
    maxBedsPerRoom: number | null
    minDistancePerDay: number | null
    maxDistancePerDay: number | null
    maxAscentPerDay: number | null
  }

  export type TourMinAggregateOutputType = {
    id: string | null
    name: string | null
    groupSize: number | null
    totalDays: number | null
    restDays: number | null
    accommodationType: $Enums.AccommodationType | null
    maxBedsPerRoom: number | null
    minDistancePerDay: number | null
    maxDistancePerDay: number | null
    maxAscentPerDay: number | null
    dateRangeStart: Date | null
    dateRangeEnd: Date | null
    status: $Enums.TourStatus | null
    createdAt: Date | null
  }

  export type TourMaxAggregateOutputType = {
    id: string | null
    name: string | null
    groupSize: number | null
    totalDays: number | null
    restDays: number | null
    accommodationType: $Enums.AccommodationType | null
    maxBedsPerRoom: number | null
    minDistancePerDay: number | null
    maxDistancePerDay: number | null
    maxAscentPerDay: number | null
    dateRangeStart: Date | null
    dateRangeEnd: Date | null
    status: $Enums.TourStatus | null
    createdAt: Date | null
  }

  export type TourCountAggregateOutputType = {
    id: number
    name: number
    groupSize: number
    totalDays: number
    restDays: number
    accommodationType: number
    maxBedsPerRoom: number
    minDistancePerDay: number
    maxDistancePerDay: number
    maxAscentPerDay: number
    dateRangeStart: number
    dateRangeEnd: number
    status: number
    createdAt: number
    _all: number
  }


  export type TourAvgAggregateInputType = {
    groupSize?: true
    totalDays?: true
    restDays?: true
    maxBedsPerRoom?: true
    minDistancePerDay?: true
    maxDistancePerDay?: true
    maxAscentPerDay?: true
  }

  export type TourSumAggregateInputType = {
    groupSize?: true
    totalDays?: true
    restDays?: true
    maxBedsPerRoom?: true
    minDistancePerDay?: true
    maxDistancePerDay?: true
    maxAscentPerDay?: true
  }

  export type TourMinAggregateInputType = {
    id?: true
    name?: true
    groupSize?: true
    totalDays?: true
    restDays?: true
    accommodationType?: true
    maxBedsPerRoom?: true
    minDistancePerDay?: true
    maxDistancePerDay?: true
    maxAscentPerDay?: true
    dateRangeStart?: true
    dateRangeEnd?: true
    status?: true
    createdAt?: true
  }

  export type TourMaxAggregateInputType = {
    id?: true
    name?: true
    groupSize?: true
    totalDays?: true
    restDays?: true
    accommodationType?: true
    maxBedsPerRoom?: true
    minDistancePerDay?: true
    maxDistancePerDay?: true
    maxAscentPerDay?: true
    dateRangeStart?: true
    dateRangeEnd?: true
    status?: true
    createdAt?: true
  }

  export type TourCountAggregateInputType = {
    id?: true
    name?: true
    groupSize?: true
    totalDays?: true
    restDays?: true
    accommodationType?: true
    maxBedsPerRoom?: true
    minDistancePerDay?: true
    maxDistancePerDay?: true
    maxAscentPerDay?: true
    dateRangeStart?: true
    dateRangeEnd?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type TourAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tour to aggregate.
     */
    where?: TourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tours to fetch.
     */
    orderBy?: TourOrderByWithRelationInput | TourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tours
    **/
    _count?: true | TourCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TourAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TourSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TourMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TourMaxAggregateInputType
  }

  export type GetTourAggregateType<T extends TourAggregateArgs> = {
        [P in keyof T & keyof AggregateTour]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTour[P]>
      : GetScalarType<T[P], AggregateTour[P]>
  }




  export type TourGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TourWhereInput
    orderBy?: TourOrderByWithAggregationInput | TourOrderByWithAggregationInput[]
    by: TourScalarFieldEnum[] | TourScalarFieldEnum
    having?: TourScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TourCountAggregateInputType | true
    _avg?: TourAvgAggregateInputType
    _sum?: TourSumAggregateInputType
    _min?: TourMinAggregateInputType
    _max?: TourMaxAggregateInputType
  }

  export type TourGroupByOutputType = {
    id: string
    name: string | null
    groupSize: number
    totalDays: number
    restDays: number
    accommodationType: $Enums.AccommodationType
    maxBedsPerRoom: number | null
    minDistancePerDay: number | null
    maxDistancePerDay: number | null
    maxAscentPerDay: number | null
    dateRangeStart: Date | null
    dateRangeEnd: Date | null
    status: $Enums.TourStatus
    createdAt: Date
    _count: TourCountAggregateOutputType | null
    _avg: TourAvgAggregateOutputType | null
    _sum: TourSumAggregateOutputType | null
    _min: TourMinAggregateOutputType | null
    _max: TourMaxAggregateOutputType | null
  }

  type GetTourGroupByPayload<T extends TourGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TourGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TourGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TourGroupByOutputType[P]>
            : GetScalarType<T[P], TourGroupByOutputType[P]>
        }
      >
    >


  export type TourSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    groupSize?: boolean
    totalDays?: boolean
    restDays?: boolean
    accommodationType?: boolean
    maxBedsPerRoom?: boolean
    minDistancePerDay?: boolean
    maxDistancePerDay?: boolean
    maxAscentPerDay?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    status?: boolean
    createdAt?: boolean
    huts?: boolean | Tour$hutsArgs<ExtArgs>
    _count?: boolean | TourCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tour"]>

  export type TourSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    groupSize?: boolean
    totalDays?: boolean
    restDays?: boolean
    accommodationType?: boolean
    maxBedsPerRoom?: boolean
    minDistancePerDay?: boolean
    maxDistancePerDay?: boolean
    maxAscentPerDay?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tour"]>

  export type TourSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    groupSize?: boolean
    totalDays?: boolean
    restDays?: boolean
    accommodationType?: boolean
    maxBedsPerRoom?: boolean
    minDistancePerDay?: boolean
    maxDistancePerDay?: boolean
    maxAscentPerDay?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tour"]>

  export type TourSelectScalar = {
    id?: boolean
    name?: boolean
    groupSize?: boolean
    totalDays?: boolean
    restDays?: boolean
    accommodationType?: boolean
    maxBedsPerRoom?: boolean
    minDistancePerDay?: boolean
    maxDistancePerDay?: boolean
    maxAscentPerDay?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type TourOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "groupSize" | "totalDays" | "restDays" | "accommodationType" | "maxBedsPerRoom" | "minDistancePerDay" | "maxDistancePerDay" | "maxAscentPerDay" | "dateRangeStart" | "dateRangeEnd" | "status" | "createdAt", ExtArgs["result"]["tour"]>
  export type TourInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    huts?: boolean | Tour$hutsArgs<ExtArgs>
    _count?: boolean | TourCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TourIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TourIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TourPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tour"
    objects: {
      huts: Prisma.$TourHutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      groupSize: number
      totalDays: number
      restDays: number
      accommodationType: $Enums.AccommodationType
      maxBedsPerRoom: number | null
      minDistancePerDay: number | null
      maxDistancePerDay: number | null
      maxAscentPerDay: number | null
      dateRangeStart: Date | null
      dateRangeEnd: Date | null
      status: $Enums.TourStatus
      createdAt: Date
    }, ExtArgs["result"]["tour"]>
    composites: {}
  }

  type TourGetPayload<S extends boolean | null | undefined | TourDefaultArgs> = $Result.GetResult<Prisma.$TourPayload, S>

  type TourCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TourFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TourCountAggregateInputType | true
    }

  export interface TourDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tour'], meta: { name: 'Tour' } }
    /**
     * Find zero or one Tour that matches the filter.
     * @param {TourFindUniqueArgs} args - Arguments to find a Tour
     * @example
     * // Get one Tour
     * const tour = await prisma.tour.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TourFindUniqueArgs>(args: SelectSubset<T, TourFindUniqueArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tour that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TourFindUniqueOrThrowArgs} args - Arguments to find a Tour
     * @example
     * // Get one Tour
     * const tour = await prisma.tour.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TourFindUniqueOrThrowArgs>(args: SelectSubset<T, TourFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tour that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourFindFirstArgs} args - Arguments to find a Tour
     * @example
     * // Get one Tour
     * const tour = await prisma.tour.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TourFindFirstArgs>(args?: SelectSubset<T, TourFindFirstArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tour that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourFindFirstOrThrowArgs} args - Arguments to find a Tour
     * @example
     * // Get one Tour
     * const tour = await prisma.tour.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TourFindFirstOrThrowArgs>(args?: SelectSubset<T, TourFindFirstOrThrowArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tours
     * const tours = await prisma.tour.findMany()
     * 
     * // Get first 10 Tours
     * const tours = await prisma.tour.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tourWithIdOnly = await prisma.tour.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TourFindManyArgs>(args?: SelectSubset<T, TourFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tour.
     * @param {TourCreateArgs} args - Arguments to create a Tour.
     * @example
     * // Create one Tour
     * const Tour = await prisma.tour.create({
     *   data: {
     *     // ... data to create a Tour
     *   }
     * })
     * 
     */
    create<T extends TourCreateArgs>(args: SelectSubset<T, TourCreateArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tours.
     * @param {TourCreateManyArgs} args - Arguments to create many Tours.
     * @example
     * // Create many Tours
     * const tour = await prisma.tour.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TourCreateManyArgs>(args?: SelectSubset<T, TourCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tours and returns the data saved in the database.
     * @param {TourCreateManyAndReturnArgs} args - Arguments to create many Tours.
     * @example
     * // Create many Tours
     * const tour = await prisma.tour.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tours and only return the `id`
     * const tourWithIdOnly = await prisma.tour.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TourCreateManyAndReturnArgs>(args?: SelectSubset<T, TourCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tour.
     * @param {TourDeleteArgs} args - Arguments to delete one Tour.
     * @example
     * // Delete one Tour
     * const Tour = await prisma.tour.delete({
     *   where: {
     *     // ... filter to delete one Tour
     *   }
     * })
     * 
     */
    delete<T extends TourDeleteArgs>(args: SelectSubset<T, TourDeleteArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tour.
     * @param {TourUpdateArgs} args - Arguments to update one Tour.
     * @example
     * // Update one Tour
     * const tour = await prisma.tour.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TourUpdateArgs>(args: SelectSubset<T, TourUpdateArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tours.
     * @param {TourDeleteManyArgs} args - Arguments to filter Tours to delete.
     * @example
     * // Delete a few Tours
     * const { count } = await prisma.tour.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TourDeleteManyArgs>(args?: SelectSubset<T, TourDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tours
     * const tour = await prisma.tour.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TourUpdateManyArgs>(args: SelectSubset<T, TourUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tours and returns the data updated in the database.
     * @param {TourUpdateManyAndReturnArgs} args - Arguments to update many Tours.
     * @example
     * // Update many Tours
     * const tour = await prisma.tour.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tours and only return the `id`
     * const tourWithIdOnly = await prisma.tour.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TourUpdateManyAndReturnArgs>(args: SelectSubset<T, TourUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tour.
     * @param {TourUpsertArgs} args - Arguments to update or create a Tour.
     * @example
     * // Update or create a Tour
     * const tour = await prisma.tour.upsert({
     *   create: {
     *     // ... data to create a Tour
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tour we want to update
     *   }
     * })
     */
    upsert<T extends TourUpsertArgs>(args: SelectSubset<T, TourUpsertArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourCountArgs} args - Arguments to filter Tours to count.
     * @example
     * // Count the number of Tours
     * const count = await prisma.tour.count({
     *   where: {
     *     // ... the filter for the Tours we want to count
     *   }
     * })
    **/
    count<T extends TourCountArgs>(
      args?: Subset<T, TourCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TourCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tour.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TourAggregateArgs>(args: Subset<T, TourAggregateArgs>): Prisma.PrismaPromise<GetTourAggregateType<T>>

    /**
     * Group by Tour.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TourGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TourGroupByArgs['orderBy'] }
        : { orderBy?: TourGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TourGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTourGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tour model
   */
  readonly fields: TourFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tour.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TourClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    huts<T extends Tour$hutsArgs<ExtArgs> = {}>(args?: Subset<T, Tour$hutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tour model
   */
  interface TourFieldRefs {
    readonly id: FieldRef<"Tour", 'String'>
    readonly name: FieldRef<"Tour", 'String'>
    readonly groupSize: FieldRef<"Tour", 'Int'>
    readonly totalDays: FieldRef<"Tour", 'Int'>
    readonly restDays: FieldRef<"Tour", 'Int'>
    readonly accommodationType: FieldRef<"Tour", 'AccommodationType'>
    readonly maxBedsPerRoom: FieldRef<"Tour", 'Int'>
    readonly minDistancePerDay: FieldRef<"Tour", 'Float'>
    readonly maxDistancePerDay: FieldRef<"Tour", 'Float'>
    readonly maxAscentPerDay: FieldRef<"Tour", 'Int'>
    readonly dateRangeStart: FieldRef<"Tour", 'DateTime'>
    readonly dateRangeEnd: FieldRef<"Tour", 'DateTime'>
    readonly status: FieldRef<"Tour", 'TourStatus'>
    readonly createdAt: FieldRef<"Tour", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tour findUnique
   */
  export type TourFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * Filter, which Tour to fetch.
     */
    where: TourWhereUniqueInput
  }

  /**
   * Tour findUniqueOrThrow
   */
  export type TourFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * Filter, which Tour to fetch.
     */
    where: TourWhereUniqueInput
  }

  /**
   * Tour findFirst
   */
  export type TourFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * Filter, which Tour to fetch.
     */
    where?: TourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tours to fetch.
     */
    orderBy?: TourOrderByWithRelationInput | TourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tours.
     */
    cursor?: TourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tours.
     */
    distinct?: TourScalarFieldEnum | TourScalarFieldEnum[]
  }

  /**
   * Tour findFirstOrThrow
   */
  export type TourFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * Filter, which Tour to fetch.
     */
    where?: TourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tours to fetch.
     */
    orderBy?: TourOrderByWithRelationInput | TourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tours.
     */
    cursor?: TourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tours.
     */
    distinct?: TourScalarFieldEnum | TourScalarFieldEnum[]
  }

  /**
   * Tour findMany
   */
  export type TourFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * Filter, which Tours to fetch.
     */
    where?: TourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tours to fetch.
     */
    orderBy?: TourOrderByWithRelationInput | TourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tours.
     */
    cursor?: TourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tours.
     */
    skip?: number
    distinct?: TourScalarFieldEnum | TourScalarFieldEnum[]
  }

  /**
   * Tour create
   */
  export type TourCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * The data needed to create a Tour.
     */
    data: XOR<TourCreateInput, TourUncheckedCreateInput>
  }

  /**
   * Tour createMany
   */
  export type TourCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tours.
     */
    data: TourCreateManyInput | TourCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tour createManyAndReturn
   */
  export type TourCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * The data used to create many Tours.
     */
    data: TourCreateManyInput | TourCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tour update
   */
  export type TourUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * The data needed to update a Tour.
     */
    data: XOR<TourUpdateInput, TourUncheckedUpdateInput>
    /**
     * Choose, which Tour to update.
     */
    where: TourWhereUniqueInput
  }

  /**
   * Tour updateMany
   */
  export type TourUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tours.
     */
    data: XOR<TourUpdateManyMutationInput, TourUncheckedUpdateManyInput>
    /**
     * Filter which Tours to update
     */
    where?: TourWhereInput
    /**
     * Limit how many Tours to update.
     */
    limit?: number
  }

  /**
   * Tour updateManyAndReturn
   */
  export type TourUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * The data used to update Tours.
     */
    data: XOR<TourUpdateManyMutationInput, TourUncheckedUpdateManyInput>
    /**
     * Filter which Tours to update
     */
    where?: TourWhereInput
    /**
     * Limit how many Tours to update.
     */
    limit?: number
  }

  /**
   * Tour upsert
   */
  export type TourUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * The filter to search for the Tour to update in case it exists.
     */
    where: TourWhereUniqueInput
    /**
     * In case the Tour found by the `where` argument doesn't exist, create a new Tour with this data.
     */
    create: XOR<TourCreateInput, TourUncheckedCreateInput>
    /**
     * In case the Tour was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TourUpdateInput, TourUncheckedUpdateInput>
  }

  /**
   * Tour delete
   */
  export type TourDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
    /**
     * Filter which Tour to delete.
     */
    where: TourWhereUniqueInput
  }

  /**
   * Tour deleteMany
   */
  export type TourDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tours to delete
     */
    where?: TourWhereInput
    /**
     * Limit how many Tours to delete.
     */
    limit?: number
  }

  /**
   * Tour.huts
   */
  export type Tour$hutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    where?: TourHutWhereInput
    orderBy?: TourHutOrderByWithRelationInput | TourHutOrderByWithRelationInput[]
    cursor?: TourHutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TourHutScalarFieldEnum | TourHutScalarFieldEnum[]
  }

  /**
   * Tour without action
   */
  export type TourDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tour
     */
    select?: TourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tour
     */
    omit?: TourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInclude<ExtArgs> | null
  }


  /**
   * Model TourHut
   */

  export type AggregateTourHut = {
    _count: TourHutCountAggregateOutputType | null
    _avg: TourHutAvgAggregateOutputType | null
    _sum: TourHutSumAggregateOutputType | null
    _min: TourHutMinAggregateOutputType | null
    _max: TourHutMaxAggregateOutputType | null
  }

  export type TourHutAvgAggregateOutputType = {
    dayNumber: number | null
  }

  export type TourHutSumAggregateOutputType = {
    dayNumber: number | null
  }

  export type TourHutMinAggregateOutputType = {
    id: string | null
    tourId: string | null
    hutId: string | null
    dayNumber: number | null
  }

  export type TourHutMaxAggregateOutputType = {
    id: string | null
    tourId: string | null
    hutId: string | null
    dayNumber: number | null
  }

  export type TourHutCountAggregateOutputType = {
    id: number
    tourId: number
    hutId: number
    dayNumber: number
    _all: number
  }


  export type TourHutAvgAggregateInputType = {
    dayNumber?: true
  }

  export type TourHutSumAggregateInputType = {
    dayNumber?: true
  }

  export type TourHutMinAggregateInputType = {
    id?: true
    tourId?: true
    hutId?: true
    dayNumber?: true
  }

  export type TourHutMaxAggregateInputType = {
    id?: true
    tourId?: true
    hutId?: true
    dayNumber?: true
  }

  export type TourHutCountAggregateInputType = {
    id?: true
    tourId?: true
    hutId?: true
    dayNumber?: true
    _all?: true
  }

  export type TourHutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TourHut to aggregate.
     */
    where?: TourHutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourHuts to fetch.
     */
    orderBy?: TourHutOrderByWithRelationInput | TourHutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TourHutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourHuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourHuts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TourHuts
    **/
    _count?: true | TourHutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TourHutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TourHutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TourHutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TourHutMaxAggregateInputType
  }

  export type GetTourHutAggregateType<T extends TourHutAggregateArgs> = {
        [P in keyof T & keyof AggregateTourHut]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTourHut[P]>
      : GetScalarType<T[P], AggregateTourHut[P]>
  }




  export type TourHutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TourHutWhereInput
    orderBy?: TourHutOrderByWithAggregationInput | TourHutOrderByWithAggregationInput[]
    by: TourHutScalarFieldEnum[] | TourHutScalarFieldEnum
    having?: TourHutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TourHutCountAggregateInputType | true
    _avg?: TourHutAvgAggregateInputType
    _sum?: TourHutSumAggregateInputType
    _min?: TourHutMinAggregateInputType
    _max?: TourHutMaxAggregateInputType
  }

  export type TourHutGroupByOutputType = {
    id: string
    tourId: string
    hutId: string
    dayNumber: number
    _count: TourHutCountAggregateOutputType | null
    _avg: TourHutAvgAggregateOutputType | null
    _sum: TourHutSumAggregateOutputType | null
    _min: TourHutMinAggregateOutputType | null
    _max: TourHutMaxAggregateOutputType | null
  }

  type GetTourHutGroupByPayload<T extends TourHutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TourHutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TourHutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TourHutGroupByOutputType[P]>
            : GetScalarType<T[P], TourHutGroupByOutputType[P]>
        }
      >
    >


  export type TourHutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tourId?: boolean
    hutId?: boolean
    dayNumber?: boolean
    tour?: boolean | TourDefaultArgs<ExtArgs>
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tourHut"]>

  export type TourHutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tourId?: boolean
    hutId?: boolean
    dayNumber?: boolean
    tour?: boolean | TourDefaultArgs<ExtArgs>
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tourHut"]>

  export type TourHutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tourId?: boolean
    hutId?: boolean
    dayNumber?: boolean
    tour?: boolean | TourDefaultArgs<ExtArgs>
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tourHut"]>

  export type TourHutSelectScalar = {
    id?: boolean
    tourId?: boolean
    hutId?: boolean
    dayNumber?: boolean
  }

  export type TourHutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tourId" | "hutId" | "dayNumber", ExtArgs["result"]["tourHut"]>
  export type TourHutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tour?: boolean | TourDefaultArgs<ExtArgs>
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type TourHutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tour?: boolean | TourDefaultArgs<ExtArgs>
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type TourHutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tour?: boolean | TourDefaultArgs<ExtArgs>
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }

  export type $TourHutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TourHut"
    objects: {
      tour: Prisma.$TourPayload<ExtArgs>
      hut: Prisma.$HutPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tourId: string
      hutId: string
      dayNumber: number
    }, ExtArgs["result"]["tourHut"]>
    composites: {}
  }

  type TourHutGetPayload<S extends boolean | null | undefined | TourHutDefaultArgs> = $Result.GetResult<Prisma.$TourHutPayload, S>

  type TourHutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TourHutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TourHutCountAggregateInputType | true
    }

  export interface TourHutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TourHut'], meta: { name: 'TourHut' } }
    /**
     * Find zero or one TourHut that matches the filter.
     * @param {TourHutFindUniqueArgs} args - Arguments to find a TourHut
     * @example
     * // Get one TourHut
     * const tourHut = await prisma.tourHut.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TourHutFindUniqueArgs>(args: SelectSubset<T, TourHutFindUniqueArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TourHut that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TourHutFindUniqueOrThrowArgs} args - Arguments to find a TourHut
     * @example
     * // Get one TourHut
     * const tourHut = await prisma.tourHut.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TourHutFindUniqueOrThrowArgs>(args: SelectSubset<T, TourHutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TourHut that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourHutFindFirstArgs} args - Arguments to find a TourHut
     * @example
     * // Get one TourHut
     * const tourHut = await prisma.tourHut.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TourHutFindFirstArgs>(args?: SelectSubset<T, TourHutFindFirstArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TourHut that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourHutFindFirstOrThrowArgs} args - Arguments to find a TourHut
     * @example
     * // Get one TourHut
     * const tourHut = await prisma.tourHut.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TourHutFindFirstOrThrowArgs>(args?: SelectSubset<T, TourHutFindFirstOrThrowArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TourHuts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourHutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TourHuts
     * const tourHuts = await prisma.tourHut.findMany()
     * 
     * // Get first 10 TourHuts
     * const tourHuts = await prisma.tourHut.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tourHutWithIdOnly = await prisma.tourHut.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TourHutFindManyArgs>(args?: SelectSubset<T, TourHutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TourHut.
     * @param {TourHutCreateArgs} args - Arguments to create a TourHut.
     * @example
     * // Create one TourHut
     * const TourHut = await prisma.tourHut.create({
     *   data: {
     *     // ... data to create a TourHut
     *   }
     * })
     * 
     */
    create<T extends TourHutCreateArgs>(args: SelectSubset<T, TourHutCreateArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TourHuts.
     * @param {TourHutCreateManyArgs} args - Arguments to create many TourHuts.
     * @example
     * // Create many TourHuts
     * const tourHut = await prisma.tourHut.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TourHutCreateManyArgs>(args?: SelectSubset<T, TourHutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TourHuts and returns the data saved in the database.
     * @param {TourHutCreateManyAndReturnArgs} args - Arguments to create many TourHuts.
     * @example
     * // Create many TourHuts
     * const tourHut = await prisma.tourHut.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TourHuts and only return the `id`
     * const tourHutWithIdOnly = await prisma.tourHut.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TourHutCreateManyAndReturnArgs>(args?: SelectSubset<T, TourHutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TourHut.
     * @param {TourHutDeleteArgs} args - Arguments to delete one TourHut.
     * @example
     * // Delete one TourHut
     * const TourHut = await prisma.tourHut.delete({
     *   where: {
     *     // ... filter to delete one TourHut
     *   }
     * })
     * 
     */
    delete<T extends TourHutDeleteArgs>(args: SelectSubset<T, TourHutDeleteArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TourHut.
     * @param {TourHutUpdateArgs} args - Arguments to update one TourHut.
     * @example
     * // Update one TourHut
     * const tourHut = await prisma.tourHut.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TourHutUpdateArgs>(args: SelectSubset<T, TourHutUpdateArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TourHuts.
     * @param {TourHutDeleteManyArgs} args - Arguments to filter TourHuts to delete.
     * @example
     * // Delete a few TourHuts
     * const { count } = await prisma.tourHut.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TourHutDeleteManyArgs>(args?: SelectSubset<T, TourHutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TourHuts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourHutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TourHuts
     * const tourHut = await prisma.tourHut.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TourHutUpdateManyArgs>(args: SelectSubset<T, TourHutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TourHuts and returns the data updated in the database.
     * @param {TourHutUpdateManyAndReturnArgs} args - Arguments to update many TourHuts.
     * @example
     * // Update many TourHuts
     * const tourHut = await prisma.tourHut.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TourHuts and only return the `id`
     * const tourHutWithIdOnly = await prisma.tourHut.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TourHutUpdateManyAndReturnArgs>(args: SelectSubset<T, TourHutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TourHut.
     * @param {TourHutUpsertArgs} args - Arguments to update or create a TourHut.
     * @example
     * // Update or create a TourHut
     * const tourHut = await prisma.tourHut.upsert({
     *   create: {
     *     // ... data to create a TourHut
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TourHut we want to update
     *   }
     * })
     */
    upsert<T extends TourHutUpsertArgs>(args: SelectSubset<T, TourHutUpsertArgs<ExtArgs>>): Prisma__TourHutClient<$Result.GetResult<Prisma.$TourHutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TourHuts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourHutCountArgs} args - Arguments to filter TourHuts to count.
     * @example
     * // Count the number of TourHuts
     * const count = await prisma.tourHut.count({
     *   where: {
     *     // ... the filter for the TourHuts we want to count
     *   }
     * })
    **/
    count<T extends TourHutCountArgs>(
      args?: Subset<T, TourHutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TourHutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TourHut.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourHutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TourHutAggregateArgs>(args: Subset<T, TourHutAggregateArgs>): Prisma.PrismaPromise<GetTourHutAggregateType<T>>

    /**
     * Group by TourHut.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourHutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TourHutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TourHutGroupByArgs['orderBy'] }
        : { orderBy?: TourHutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TourHutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTourHutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TourHut model
   */
  readonly fields: TourHutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TourHut.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TourHutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tour<T extends TourDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TourDefaultArgs<ExtArgs>>): Prisma__TourClient<$Result.GetResult<Prisma.$TourPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    hut<T extends HutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HutDefaultArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TourHut model
   */
  interface TourHutFieldRefs {
    readonly id: FieldRef<"TourHut", 'String'>
    readonly tourId: FieldRef<"TourHut", 'String'>
    readonly hutId: FieldRef<"TourHut", 'String'>
    readonly dayNumber: FieldRef<"TourHut", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TourHut findUnique
   */
  export type TourHutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * Filter, which TourHut to fetch.
     */
    where: TourHutWhereUniqueInput
  }

  /**
   * TourHut findUniqueOrThrow
   */
  export type TourHutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * Filter, which TourHut to fetch.
     */
    where: TourHutWhereUniqueInput
  }

  /**
   * TourHut findFirst
   */
  export type TourHutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * Filter, which TourHut to fetch.
     */
    where?: TourHutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourHuts to fetch.
     */
    orderBy?: TourHutOrderByWithRelationInput | TourHutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TourHuts.
     */
    cursor?: TourHutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourHuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourHuts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TourHuts.
     */
    distinct?: TourHutScalarFieldEnum | TourHutScalarFieldEnum[]
  }

  /**
   * TourHut findFirstOrThrow
   */
  export type TourHutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * Filter, which TourHut to fetch.
     */
    where?: TourHutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourHuts to fetch.
     */
    orderBy?: TourHutOrderByWithRelationInput | TourHutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TourHuts.
     */
    cursor?: TourHutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourHuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourHuts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TourHuts.
     */
    distinct?: TourHutScalarFieldEnum | TourHutScalarFieldEnum[]
  }

  /**
   * TourHut findMany
   */
  export type TourHutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * Filter, which TourHuts to fetch.
     */
    where?: TourHutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourHuts to fetch.
     */
    orderBy?: TourHutOrderByWithRelationInput | TourHutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TourHuts.
     */
    cursor?: TourHutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourHuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourHuts.
     */
    skip?: number
    distinct?: TourHutScalarFieldEnum | TourHutScalarFieldEnum[]
  }

  /**
   * TourHut create
   */
  export type TourHutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * The data needed to create a TourHut.
     */
    data: XOR<TourHutCreateInput, TourHutUncheckedCreateInput>
  }

  /**
   * TourHut createMany
   */
  export type TourHutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TourHuts.
     */
    data: TourHutCreateManyInput | TourHutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TourHut createManyAndReturn
   */
  export type TourHutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * The data used to create many TourHuts.
     */
    data: TourHutCreateManyInput | TourHutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TourHut update
   */
  export type TourHutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * The data needed to update a TourHut.
     */
    data: XOR<TourHutUpdateInput, TourHutUncheckedUpdateInput>
    /**
     * Choose, which TourHut to update.
     */
    where: TourHutWhereUniqueInput
  }

  /**
   * TourHut updateMany
   */
  export type TourHutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TourHuts.
     */
    data: XOR<TourHutUpdateManyMutationInput, TourHutUncheckedUpdateManyInput>
    /**
     * Filter which TourHuts to update
     */
    where?: TourHutWhereInput
    /**
     * Limit how many TourHuts to update.
     */
    limit?: number
  }

  /**
   * TourHut updateManyAndReturn
   */
  export type TourHutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * The data used to update TourHuts.
     */
    data: XOR<TourHutUpdateManyMutationInput, TourHutUncheckedUpdateManyInput>
    /**
     * Filter which TourHuts to update
     */
    where?: TourHutWhereInput
    /**
     * Limit how many TourHuts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TourHut upsert
   */
  export type TourHutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * The filter to search for the TourHut to update in case it exists.
     */
    where: TourHutWhereUniqueInput
    /**
     * In case the TourHut found by the `where` argument doesn't exist, create a new TourHut with this data.
     */
    create: XOR<TourHutCreateInput, TourHutUncheckedCreateInput>
    /**
     * In case the TourHut was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TourHutUpdateInput, TourHutUncheckedUpdateInput>
  }

  /**
   * TourHut delete
   */
  export type TourHutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
    /**
     * Filter which TourHut to delete.
     */
    where: TourHutWhereUniqueInput
  }

  /**
   * TourHut deleteMany
   */
  export type TourHutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TourHuts to delete
     */
    where?: TourHutWhereInput
    /**
     * Limit how many TourHuts to delete.
     */
    limit?: number
  }

  /**
   * TourHut without action
   */
  export type TourHutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourHut
     */
    select?: TourHutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourHut
     */
    omit?: TourHutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourHutInclude<ExtArgs> | null
  }


  /**
   * Model AvailabilityCheck
   */

  export type AggregateAvailabilityCheck = {
    _count: AvailabilityCheckCountAggregateOutputType | null
    _avg: AvailabilityCheckAvgAggregateOutputType | null
    _sum: AvailabilityCheckSumAggregateOutputType | null
    _min: AvailabilityCheckMinAggregateOutputType | null
    _max: AvailabilityCheckMaxAggregateOutputType | null
  }

  export type AvailabilityCheckAvgAggregateOutputType = {
    available: number | null
  }

  export type AvailabilityCheckSumAggregateOutputType = {
    available: number | null
  }

  export type AvailabilityCheckMinAggregateOutputType = {
    id: string | null
    hutId: string | null
    date: Date | null
    roomType: $Enums.RoomType | null
    available: number | null
    checkedAt: Date | null
    source: $Enums.BookingSystem | null
  }

  export type AvailabilityCheckMaxAggregateOutputType = {
    id: string | null
    hutId: string | null
    date: Date | null
    roomType: $Enums.RoomType | null
    available: number | null
    checkedAt: Date | null
    source: $Enums.BookingSystem | null
  }

  export type AvailabilityCheckCountAggregateOutputType = {
    id: number
    hutId: number
    date: number
    roomType: number
    available: number
    checkedAt: number
    source: number
    _all: number
  }


  export type AvailabilityCheckAvgAggregateInputType = {
    available?: true
  }

  export type AvailabilityCheckSumAggregateInputType = {
    available?: true
  }

  export type AvailabilityCheckMinAggregateInputType = {
    id?: true
    hutId?: true
    date?: true
    roomType?: true
    available?: true
    checkedAt?: true
    source?: true
  }

  export type AvailabilityCheckMaxAggregateInputType = {
    id?: true
    hutId?: true
    date?: true
    roomType?: true
    available?: true
    checkedAt?: true
    source?: true
  }

  export type AvailabilityCheckCountAggregateInputType = {
    id?: true
    hutId?: true
    date?: true
    roomType?: true
    available?: true
    checkedAt?: true
    source?: true
    _all?: true
  }

  export type AvailabilityCheckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityCheck to aggregate.
     */
    where?: AvailabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityChecks to fetch.
     */
    orderBy?: AvailabilityCheckOrderByWithRelationInput | AvailabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailabilityChecks
    **/
    _count?: true | AvailabilityCheckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvailabilityCheckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvailabilityCheckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailabilityCheckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailabilityCheckMaxAggregateInputType
  }

  export type GetAvailabilityCheckAggregateType<T extends AvailabilityCheckAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailabilityCheck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailabilityCheck[P]>
      : GetScalarType<T[P], AggregateAvailabilityCheck[P]>
  }




  export type AvailabilityCheckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityCheckWhereInput
    orderBy?: AvailabilityCheckOrderByWithAggregationInput | AvailabilityCheckOrderByWithAggregationInput[]
    by: AvailabilityCheckScalarFieldEnum[] | AvailabilityCheckScalarFieldEnum
    having?: AvailabilityCheckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailabilityCheckCountAggregateInputType | true
    _avg?: AvailabilityCheckAvgAggregateInputType
    _sum?: AvailabilityCheckSumAggregateInputType
    _min?: AvailabilityCheckMinAggregateInputType
    _max?: AvailabilityCheckMaxAggregateInputType
  }

  export type AvailabilityCheckGroupByOutputType = {
    id: string
    hutId: string
    date: Date
    roomType: $Enums.RoomType
    available: number
    checkedAt: Date
    source: $Enums.BookingSystem
    _count: AvailabilityCheckCountAggregateOutputType | null
    _avg: AvailabilityCheckAvgAggregateOutputType | null
    _sum: AvailabilityCheckSumAggregateOutputType | null
    _min: AvailabilityCheckMinAggregateOutputType | null
    _max: AvailabilityCheckMaxAggregateOutputType | null
  }

  type GetAvailabilityCheckGroupByPayload<T extends AvailabilityCheckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailabilityCheckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailabilityCheckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailabilityCheckGroupByOutputType[P]>
            : GetScalarType<T[P], AvailabilityCheckGroupByOutputType[P]>
        }
      >
    >


  export type AvailabilityCheckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hutId?: boolean
    date?: boolean
    roomType?: boolean
    available?: boolean
    checkedAt?: boolean
    source?: boolean
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityCheck"]>

  export type AvailabilityCheckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hutId?: boolean
    date?: boolean
    roomType?: boolean
    available?: boolean
    checkedAt?: boolean
    source?: boolean
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityCheck"]>

  export type AvailabilityCheckSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hutId?: boolean
    date?: boolean
    roomType?: boolean
    available?: boolean
    checkedAt?: boolean
    source?: boolean
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityCheck"]>

  export type AvailabilityCheckSelectScalar = {
    id?: boolean
    hutId?: boolean
    date?: boolean
    roomType?: boolean
    available?: boolean
    checkedAt?: boolean
    source?: boolean
  }

  export type AvailabilityCheckOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hutId" | "date" | "roomType" | "available" | "checkedAt" | "source", ExtArgs["result"]["availabilityCheck"]>
  export type AvailabilityCheckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type AvailabilityCheckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }
  export type AvailabilityCheckIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hut?: boolean | HutDefaultArgs<ExtArgs>
  }

  export type $AvailabilityCheckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailabilityCheck"
    objects: {
      hut: Prisma.$HutPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hutId: string
      date: Date
      roomType: $Enums.RoomType
      available: number
      checkedAt: Date
      source: $Enums.BookingSystem
    }, ExtArgs["result"]["availabilityCheck"]>
    composites: {}
  }

  type AvailabilityCheckGetPayload<S extends boolean | null | undefined | AvailabilityCheckDefaultArgs> = $Result.GetResult<Prisma.$AvailabilityCheckPayload, S>

  type AvailabilityCheckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvailabilityCheckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvailabilityCheckCountAggregateInputType | true
    }

  export interface AvailabilityCheckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailabilityCheck'], meta: { name: 'AvailabilityCheck' } }
    /**
     * Find zero or one AvailabilityCheck that matches the filter.
     * @param {AvailabilityCheckFindUniqueArgs} args - Arguments to find a AvailabilityCheck
     * @example
     * // Get one AvailabilityCheck
     * const availabilityCheck = await prisma.availabilityCheck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailabilityCheckFindUniqueArgs>(args: SelectSubset<T, AvailabilityCheckFindUniqueArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvailabilityCheck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvailabilityCheckFindUniqueOrThrowArgs} args - Arguments to find a AvailabilityCheck
     * @example
     * // Get one AvailabilityCheck
     * const availabilityCheck = await prisma.availabilityCheck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailabilityCheckFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailabilityCheckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailabilityCheck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityCheckFindFirstArgs} args - Arguments to find a AvailabilityCheck
     * @example
     * // Get one AvailabilityCheck
     * const availabilityCheck = await prisma.availabilityCheck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailabilityCheckFindFirstArgs>(args?: SelectSubset<T, AvailabilityCheckFindFirstArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailabilityCheck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityCheckFindFirstOrThrowArgs} args - Arguments to find a AvailabilityCheck
     * @example
     * // Get one AvailabilityCheck
     * const availabilityCheck = await prisma.availabilityCheck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailabilityCheckFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailabilityCheckFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvailabilityChecks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityCheckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailabilityChecks
     * const availabilityChecks = await prisma.availabilityCheck.findMany()
     * 
     * // Get first 10 AvailabilityChecks
     * const availabilityChecks = await prisma.availabilityCheck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availabilityCheckWithIdOnly = await prisma.availabilityCheck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailabilityCheckFindManyArgs>(args?: SelectSubset<T, AvailabilityCheckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvailabilityCheck.
     * @param {AvailabilityCheckCreateArgs} args - Arguments to create a AvailabilityCheck.
     * @example
     * // Create one AvailabilityCheck
     * const AvailabilityCheck = await prisma.availabilityCheck.create({
     *   data: {
     *     // ... data to create a AvailabilityCheck
     *   }
     * })
     * 
     */
    create<T extends AvailabilityCheckCreateArgs>(args: SelectSubset<T, AvailabilityCheckCreateArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvailabilityChecks.
     * @param {AvailabilityCheckCreateManyArgs} args - Arguments to create many AvailabilityChecks.
     * @example
     * // Create many AvailabilityChecks
     * const availabilityCheck = await prisma.availabilityCheck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailabilityCheckCreateManyArgs>(args?: SelectSubset<T, AvailabilityCheckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailabilityChecks and returns the data saved in the database.
     * @param {AvailabilityCheckCreateManyAndReturnArgs} args - Arguments to create many AvailabilityChecks.
     * @example
     * // Create many AvailabilityChecks
     * const availabilityCheck = await prisma.availabilityCheck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailabilityChecks and only return the `id`
     * const availabilityCheckWithIdOnly = await prisma.availabilityCheck.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailabilityCheckCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailabilityCheckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvailabilityCheck.
     * @param {AvailabilityCheckDeleteArgs} args - Arguments to delete one AvailabilityCheck.
     * @example
     * // Delete one AvailabilityCheck
     * const AvailabilityCheck = await prisma.availabilityCheck.delete({
     *   where: {
     *     // ... filter to delete one AvailabilityCheck
     *   }
     * })
     * 
     */
    delete<T extends AvailabilityCheckDeleteArgs>(args: SelectSubset<T, AvailabilityCheckDeleteArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvailabilityCheck.
     * @param {AvailabilityCheckUpdateArgs} args - Arguments to update one AvailabilityCheck.
     * @example
     * // Update one AvailabilityCheck
     * const availabilityCheck = await prisma.availabilityCheck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailabilityCheckUpdateArgs>(args: SelectSubset<T, AvailabilityCheckUpdateArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvailabilityChecks.
     * @param {AvailabilityCheckDeleteManyArgs} args - Arguments to filter AvailabilityChecks to delete.
     * @example
     * // Delete a few AvailabilityChecks
     * const { count } = await prisma.availabilityCheck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailabilityCheckDeleteManyArgs>(args?: SelectSubset<T, AvailabilityCheckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailabilityChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityCheckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailabilityChecks
     * const availabilityCheck = await prisma.availabilityCheck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailabilityCheckUpdateManyArgs>(args: SelectSubset<T, AvailabilityCheckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailabilityChecks and returns the data updated in the database.
     * @param {AvailabilityCheckUpdateManyAndReturnArgs} args - Arguments to update many AvailabilityChecks.
     * @example
     * // Update many AvailabilityChecks
     * const availabilityCheck = await prisma.availabilityCheck.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvailabilityChecks and only return the `id`
     * const availabilityCheckWithIdOnly = await prisma.availabilityCheck.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvailabilityCheckUpdateManyAndReturnArgs>(args: SelectSubset<T, AvailabilityCheckUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvailabilityCheck.
     * @param {AvailabilityCheckUpsertArgs} args - Arguments to update or create a AvailabilityCheck.
     * @example
     * // Update or create a AvailabilityCheck
     * const availabilityCheck = await prisma.availabilityCheck.upsert({
     *   create: {
     *     // ... data to create a AvailabilityCheck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailabilityCheck we want to update
     *   }
     * })
     */
    upsert<T extends AvailabilityCheckUpsertArgs>(args: SelectSubset<T, AvailabilityCheckUpsertArgs<ExtArgs>>): Prisma__AvailabilityCheckClient<$Result.GetResult<Prisma.$AvailabilityCheckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvailabilityChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityCheckCountArgs} args - Arguments to filter AvailabilityChecks to count.
     * @example
     * // Count the number of AvailabilityChecks
     * const count = await prisma.availabilityCheck.count({
     *   where: {
     *     // ... the filter for the AvailabilityChecks we want to count
     *   }
     * })
    **/
    count<T extends AvailabilityCheckCountArgs>(
      args?: Subset<T, AvailabilityCheckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailabilityCheckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailabilityCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityCheckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvailabilityCheckAggregateArgs>(args: Subset<T, AvailabilityCheckAggregateArgs>): Prisma.PrismaPromise<GetAvailabilityCheckAggregateType<T>>

    /**
     * Group by AvailabilityCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityCheckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvailabilityCheckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailabilityCheckGroupByArgs['orderBy'] }
        : { orderBy?: AvailabilityCheckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvailabilityCheckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailabilityCheckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailabilityCheck model
   */
  readonly fields: AvailabilityCheckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailabilityCheck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailabilityCheckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hut<T extends HutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HutDefaultArgs<ExtArgs>>): Prisma__HutClient<$Result.GetResult<Prisma.$HutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AvailabilityCheck model
   */
  interface AvailabilityCheckFieldRefs {
    readonly id: FieldRef<"AvailabilityCheck", 'String'>
    readonly hutId: FieldRef<"AvailabilityCheck", 'String'>
    readonly date: FieldRef<"AvailabilityCheck", 'DateTime'>
    readonly roomType: FieldRef<"AvailabilityCheck", 'RoomType'>
    readonly available: FieldRef<"AvailabilityCheck", 'Int'>
    readonly checkedAt: FieldRef<"AvailabilityCheck", 'DateTime'>
    readonly source: FieldRef<"AvailabilityCheck", 'BookingSystem'>
  }
    

  // Custom InputTypes
  /**
   * AvailabilityCheck findUnique
   */
  export type AvailabilityCheckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityCheck to fetch.
     */
    where: AvailabilityCheckWhereUniqueInput
  }

  /**
   * AvailabilityCheck findUniqueOrThrow
   */
  export type AvailabilityCheckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityCheck to fetch.
     */
    where: AvailabilityCheckWhereUniqueInput
  }

  /**
   * AvailabilityCheck findFirst
   */
  export type AvailabilityCheckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityCheck to fetch.
     */
    where?: AvailabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityChecks to fetch.
     */
    orderBy?: AvailabilityCheckOrderByWithRelationInput | AvailabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityChecks.
     */
    cursor?: AvailabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityChecks.
     */
    distinct?: AvailabilityCheckScalarFieldEnum | AvailabilityCheckScalarFieldEnum[]
  }

  /**
   * AvailabilityCheck findFirstOrThrow
   */
  export type AvailabilityCheckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityCheck to fetch.
     */
    where?: AvailabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityChecks to fetch.
     */
    orderBy?: AvailabilityCheckOrderByWithRelationInput | AvailabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityChecks.
     */
    cursor?: AvailabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityChecks.
     */
    distinct?: AvailabilityCheckScalarFieldEnum | AvailabilityCheckScalarFieldEnum[]
  }

  /**
   * AvailabilityCheck findMany
   */
  export type AvailabilityCheckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityChecks to fetch.
     */
    where?: AvailabilityCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityChecks to fetch.
     */
    orderBy?: AvailabilityCheckOrderByWithRelationInput | AvailabilityCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailabilityChecks.
     */
    cursor?: AvailabilityCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityChecks.
     */
    skip?: number
    distinct?: AvailabilityCheckScalarFieldEnum | AvailabilityCheckScalarFieldEnum[]
  }

  /**
   * AvailabilityCheck create
   */
  export type AvailabilityCheckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * The data needed to create a AvailabilityCheck.
     */
    data: XOR<AvailabilityCheckCreateInput, AvailabilityCheckUncheckedCreateInput>
  }

  /**
   * AvailabilityCheck createMany
   */
  export type AvailabilityCheckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailabilityChecks.
     */
    data: AvailabilityCheckCreateManyInput | AvailabilityCheckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailabilityCheck createManyAndReturn
   */
  export type AvailabilityCheckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * The data used to create many AvailabilityChecks.
     */
    data: AvailabilityCheckCreateManyInput | AvailabilityCheckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailabilityCheck update
   */
  export type AvailabilityCheckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * The data needed to update a AvailabilityCheck.
     */
    data: XOR<AvailabilityCheckUpdateInput, AvailabilityCheckUncheckedUpdateInput>
    /**
     * Choose, which AvailabilityCheck to update.
     */
    where: AvailabilityCheckWhereUniqueInput
  }

  /**
   * AvailabilityCheck updateMany
   */
  export type AvailabilityCheckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailabilityChecks.
     */
    data: XOR<AvailabilityCheckUpdateManyMutationInput, AvailabilityCheckUncheckedUpdateManyInput>
    /**
     * Filter which AvailabilityChecks to update
     */
    where?: AvailabilityCheckWhereInput
    /**
     * Limit how many AvailabilityChecks to update.
     */
    limit?: number
  }

  /**
   * AvailabilityCheck updateManyAndReturn
   */
  export type AvailabilityCheckUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * The data used to update AvailabilityChecks.
     */
    data: XOR<AvailabilityCheckUpdateManyMutationInput, AvailabilityCheckUncheckedUpdateManyInput>
    /**
     * Filter which AvailabilityChecks to update
     */
    where?: AvailabilityCheckWhereInput
    /**
     * Limit how many AvailabilityChecks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailabilityCheck upsert
   */
  export type AvailabilityCheckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * The filter to search for the AvailabilityCheck to update in case it exists.
     */
    where: AvailabilityCheckWhereUniqueInput
    /**
     * In case the AvailabilityCheck found by the `where` argument doesn't exist, create a new AvailabilityCheck with this data.
     */
    create: XOR<AvailabilityCheckCreateInput, AvailabilityCheckUncheckedCreateInput>
    /**
     * In case the AvailabilityCheck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailabilityCheckUpdateInput, AvailabilityCheckUncheckedUpdateInput>
  }

  /**
   * AvailabilityCheck delete
   */
  export type AvailabilityCheckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
    /**
     * Filter which AvailabilityCheck to delete.
     */
    where: AvailabilityCheckWhereUniqueInput
  }

  /**
   * AvailabilityCheck deleteMany
   */
  export type AvailabilityCheckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityChecks to delete
     */
    where?: AvailabilityCheckWhereInput
    /**
     * Limit how many AvailabilityChecks to delete.
     */
    limit?: number
  }

  /**
   * AvailabilityCheck without action
   */
  export type AvailabilityCheckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityCheck
     */
    select?: AvailabilityCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailabilityCheck
     */
    omit?: AvailabilityCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityCheckInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RegionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    boundingBoxMinLat: 'boundingBoxMinLat',
    boundingBoxMinLng: 'boundingBoxMinLng',
    boundingBoxMaxLat: 'boundingBoxMaxLat',
    boundingBoxMaxLng: 'boundingBoxMaxLng',
    centerLat: 'centerLat',
    centerLng: 'centerLng'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const HutScalarFieldEnum: {
    id: 'id',
    osmId: 'osmId',
    name: 'name',
    altitude: 'altitude',
    lat: 'lat',
    lng: 'lng',
    capacity: 'capacity',
    operator: 'operator',
    website: 'website',
    phone: 'phone',
    email: 'email',
    openingHours: 'openingHours',
    bookingUrl: 'bookingUrl',
    bookingSystem: 'bookingSystem',
    imageUrl: 'imageUrl',
    description: 'description',
    amenities: 'amenities',
    dataSource: 'dataSource',
    regionId: 'regionId'
  };

  export type HutScalarFieldEnum = (typeof HutScalarFieldEnum)[keyof typeof HutScalarFieldEnum]


  export const RoomTypeConfigScalarFieldEnum: {
    id: 'id',
    hutId: 'hutId',
    type: 'type',
    count: 'count'
  };

  export type RoomTypeConfigScalarFieldEnum = (typeof RoomTypeConfigScalarFieldEnum)[keyof typeof RoomTypeConfigScalarFieldEnum]


  export const RouteScalarFieldEnum: {
    id: 'id',
    fromHutId: 'fromHutId',
    toHutId: 'toHutId',
    distance: 'distance',
    ascent: 'ascent',
    descent: 'descent',
    estimatedDuration: 'estimatedDuration',
    difficulty: 'difficulty',
    dataSource: 'dataSource',
    gpxTrack: 'gpxTrack'
  };

  export type RouteScalarFieldEnum = (typeof RouteScalarFieldEnum)[keyof typeof RouteScalarFieldEnum]


  export const TourScalarFieldEnum: {
    id: 'id',
    name: 'name',
    groupSize: 'groupSize',
    totalDays: 'totalDays',
    restDays: 'restDays',
    accommodationType: 'accommodationType',
    maxBedsPerRoom: 'maxBedsPerRoom',
    minDistancePerDay: 'minDistancePerDay',
    maxDistancePerDay: 'maxDistancePerDay',
    maxAscentPerDay: 'maxAscentPerDay',
    dateRangeStart: 'dateRangeStart',
    dateRangeEnd: 'dateRangeEnd',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type TourScalarFieldEnum = (typeof TourScalarFieldEnum)[keyof typeof TourScalarFieldEnum]


  export const TourHutScalarFieldEnum: {
    id: 'id',
    tourId: 'tourId',
    hutId: 'hutId',
    dayNumber: 'dayNumber'
  };

  export type TourHutScalarFieldEnum = (typeof TourHutScalarFieldEnum)[keyof typeof TourHutScalarFieldEnum]


  export const AvailabilityCheckScalarFieldEnum: {
    id: 'id',
    hutId: 'hutId',
    date: 'date',
    roomType: 'roomType',
    available: 'available',
    checkedAt: 'checkedAt',
    source: 'source'
  };

  export type AvailabilityCheckScalarFieldEnum = (typeof AvailabilityCheckScalarFieldEnum)[keyof typeof AvailabilityCheckScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BookingSystem'
   */
  export type EnumBookingSystemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingSystem'>
    


  /**
   * Reference to a field of type 'BookingSystem[]'
   */
  export type ListEnumBookingSystemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingSystem[]'>
    


  /**
   * Reference to a field of type 'DataSource'
   */
  export type EnumDataSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DataSource'>
    


  /**
   * Reference to a field of type 'DataSource[]'
   */
  export type ListEnumDataSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DataSource[]'>
    


  /**
   * Reference to a field of type 'RoomType'
   */
  export type EnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomType'>
    


  /**
   * Reference to a field of type 'RoomType[]'
   */
  export type ListEnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomType[]'>
    


  /**
   * Reference to a field of type 'Difficulty'
   */
  export type EnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty'>
    


  /**
   * Reference to a field of type 'Difficulty[]'
   */
  export type ListEnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AccommodationType'
   */
  export type EnumAccommodationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccommodationType'>
    


  /**
   * Reference to a field of type 'AccommodationType[]'
   */
  export type ListEnumAccommodationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccommodationType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TourStatus'
   */
  export type EnumTourStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TourStatus'>
    


  /**
   * Reference to a field of type 'TourStatus[]'
   */
  export type ListEnumTourStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TourStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    id?: StringFilter<"Region"> | string
    name?: StringFilter<"Region"> | string
    slug?: StringFilter<"Region"> | string
    boundingBoxMinLat?: FloatFilter<"Region"> | number
    boundingBoxMinLng?: FloatFilter<"Region"> | number
    boundingBoxMaxLat?: FloatFilter<"Region"> | number
    boundingBoxMaxLng?: FloatFilter<"Region"> | number
    centerLat?: FloatFilter<"Region"> | number
    centerLng?: FloatFilter<"Region"> | number
    huts?: HutListRelationFilter
  }

  export type RegionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    boundingBoxMinLat?: SortOrder
    boundingBoxMinLng?: SortOrder
    boundingBoxMaxLat?: SortOrder
    boundingBoxMaxLng?: SortOrder
    centerLat?: SortOrder
    centerLng?: SortOrder
    huts?: HutOrderByRelationAggregateInput
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    name?: StringFilter<"Region"> | string
    boundingBoxMinLat?: FloatFilter<"Region"> | number
    boundingBoxMinLng?: FloatFilter<"Region"> | number
    boundingBoxMaxLat?: FloatFilter<"Region"> | number
    boundingBoxMaxLng?: FloatFilter<"Region"> | number
    centerLat?: FloatFilter<"Region"> | number
    centerLng?: FloatFilter<"Region"> | number
    huts?: HutListRelationFilter
  }, "id" | "slug">

  export type RegionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    boundingBoxMinLat?: SortOrder
    boundingBoxMinLng?: SortOrder
    boundingBoxMaxLat?: SortOrder
    boundingBoxMaxLng?: SortOrder
    centerLat?: SortOrder
    centerLng?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _avg?: RegionAvgOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
    _sum?: RegionSumOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Region"> | string
    name?: StringWithAggregatesFilter<"Region"> | string
    slug?: StringWithAggregatesFilter<"Region"> | string
    boundingBoxMinLat?: FloatWithAggregatesFilter<"Region"> | number
    boundingBoxMinLng?: FloatWithAggregatesFilter<"Region"> | number
    boundingBoxMaxLat?: FloatWithAggregatesFilter<"Region"> | number
    boundingBoxMaxLng?: FloatWithAggregatesFilter<"Region"> | number
    centerLat?: FloatWithAggregatesFilter<"Region"> | number
    centerLng?: FloatWithAggregatesFilter<"Region"> | number
  }

  export type HutWhereInput = {
    AND?: HutWhereInput | HutWhereInput[]
    OR?: HutWhereInput[]
    NOT?: HutWhereInput | HutWhereInput[]
    id?: StringFilter<"Hut"> | string
    osmId?: BigIntNullableFilter<"Hut"> | bigint | number | null
    name?: StringFilter<"Hut"> | string
    altitude?: IntFilter<"Hut"> | number
    lat?: FloatFilter<"Hut"> | number
    lng?: FloatFilter<"Hut"> | number
    capacity?: IntFilter<"Hut"> | number
    operator?: StringNullableFilter<"Hut"> | string | null
    website?: StringNullableFilter<"Hut"> | string | null
    phone?: StringNullableFilter<"Hut"> | string | null
    email?: StringNullableFilter<"Hut"> | string | null
    openingHours?: StringNullableFilter<"Hut"> | string | null
    bookingUrl?: StringNullableFilter<"Hut"> | string | null
    bookingSystem?: EnumBookingSystemFilter<"Hut"> | $Enums.BookingSystem
    imageUrl?: StringNullableFilter<"Hut"> | string | null
    description?: StringNullableFilter<"Hut"> | string | null
    amenities?: StringNullableListFilter<"Hut">
    dataSource?: EnumDataSourceFilter<"Hut"> | $Enums.DataSource
    regionId?: StringFilter<"Hut"> | string
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
    roomTypes?: RoomTypeConfigListRelationFilter
    routesFrom?: RouteListRelationFilter
    routesTo?: RouteListRelationFilter
    availability?: AvailabilityCheckListRelationFilter
    tourHuts?: TourHutListRelationFilter
  }

  export type HutOrderByWithRelationInput = {
    id?: SortOrder
    osmId?: SortOrderInput | SortOrder
    name?: SortOrder
    altitude?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    capacity?: SortOrder
    operator?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    openingHours?: SortOrderInput | SortOrder
    bookingUrl?: SortOrderInput | SortOrder
    bookingSystem?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    amenities?: SortOrder
    dataSource?: SortOrder
    regionId?: SortOrder
    region?: RegionOrderByWithRelationInput
    roomTypes?: RoomTypeConfigOrderByRelationAggregateInput
    routesFrom?: RouteOrderByRelationAggregateInput
    routesTo?: RouteOrderByRelationAggregateInput
    availability?: AvailabilityCheckOrderByRelationAggregateInput
    tourHuts?: TourHutOrderByRelationAggregateInput
  }

  export type HutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    osmId?: bigint | number
    AND?: HutWhereInput | HutWhereInput[]
    OR?: HutWhereInput[]
    NOT?: HutWhereInput | HutWhereInput[]
    name?: StringFilter<"Hut"> | string
    altitude?: IntFilter<"Hut"> | number
    lat?: FloatFilter<"Hut"> | number
    lng?: FloatFilter<"Hut"> | number
    capacity?: IntFilter<"Hut"> | number
    operator?: StringNullableFilter<"Hut"> | string | null
    website?: StringNullableFilter<"Hut"> | string | null
    phone?: StringNullableFilter<"Hut"> | string | null
    email?: StringNullableFilter<"Hut"> | string | null
    openingHours?: StringNullableFilter<"Hut"> | string | null
    bookingUrl?: StringNullableFilter<"Hut"> | string | null
    bookingSystem?: EnumBookingSystemFilter<"Hut"> | $Enums.BookingSystem
    imageUrl?: StringNullableFilter<"Hut"> | string | null
    description?: StringNullableFilter<"Hut"> | string | null
    amenities?: StringNullableListFilter<"Hut">
    dataSource?: EnumDataSourceFilter<"Hut"> | $Enums.DataSource
    regionId?: StringFilter<"Hut"> | string
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
    roomTypes?: RoomTypeConfigListRelationFilter
    routesFrom?: RouteListRelationFilter
    routesTo?: RouteListRelationFilter
    availability?: AvailabilityCheckListRelationFilter
    tourHuts?: TourHutListRelationFilter
  }, "id" | "osmId">

  export type HutOrderByWithAggregationInput = {
    id?: SortOrder
    osmId?: SortOrderInput | SortOrder
    name?: SortOrder
    altitude?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    capacity?: SortOrder
    operator?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    openingHours?: SortOrderInput | SortOrder
    bookingUrl?: SortOrderInput | SortOrder
    bookingSystem?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    amenities?: SortOrder
    dataSource?: SortOrder
    regionId?: SortOrder
    _count?: HutCountOrderByAggregateInput
    _avg?: HutAvgOrderByAggregateInput
    _max?: HutMaxOrderByAggregateInput
    _min?: HutMinOrderByAggregateInput
    _sum?: HutSumOrderByAggregateInput
  }

  export type HutScalarWhereWithAggregatesInput = {
    AND?: HutScalarWhereWithAggregatesInput | HutScalarWhereWithAggregatesInput[]
    OR?: HutScalarWhereWithAggregatesInput[]
    NOT?: HutScalarWhereWithAggregatesInput | HutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Hut"> | string
    osmId?: BigIntNullableWithAggregatesFilter<"Hut"> | bigint | number | null
    name?: StringWithAggregatesFilter<"Hut"> | string
    altitude?: IntWithAggregatesFilter<"Hut"> | number
    lat?: FloatWithAggregatesFilter<"Hut"> | number
    lng?: FloatWithAggregatesFilter<"Hut"> | number
    capacity?: IntWithAggregatesFilter<"Hut"> | number
    operator?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    website?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    email?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    openingHours?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    bookingUrl?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    bookingSystem?: EnumBookingSystemWithAggregatesFilter<"Hut"> | $Enums.BookingSystem
    imageUrl?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    description?: StringNullableWithAggregatesFilter<"Hut"> | string | null
    amenities?: StringNullableListFilter<"Hut">
    dataSource?: EnumDataSourceWithAggregatesFilter<"Hut"> | $Enums.DataSource
    regionId?: StringWithAggregatesFilter<"Hut"> | string
  }

  export type RoomTypeConfigWhereInput = {
    AND?: RoomTypeConfigWhereInput | RoomTypeConfigWhereInput[]
    OR?: RoomTypeConfigWhereInput[]
    NOT?: RoomTypeConfigWhereInput | RoomTypeConfigWhereInput[]
    id?: StringFilter<"RoomTypeConfig"> | string
    hutId?: StringFilter<"RoomTypeConfig"> | string
    type?: EnumRoomTypeFilter<"RoomTypeConfig"> | $Enums.RoomType
    count?: IntFilter<"RoomTypeConfig"> | number
    hut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }

  export type RoomTypeConfigOrderByWithRelationInput = {
    id?: SortOrder
    hutId?: SortOrder
    type?: SortOrder
    count?: SortOrder
    hut?: HutOrderByWithRelationInput
  }

  export type RoomTypeConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hutId_type?: RoomTypeConfigHutIdTypeCompoundUniqueInput
    AND?: RoomTypeConfigWhereInput | RoomTypeConfigWhereInput[]
    OR?: RoomTypeConfigWhereInput[]
    NOT?: RoomTypeConfigWhereInput | RoomTypeConfigWhereInput[]
    hutId?: StringFilter<"RoomTypeConfig"> | string
    type?: EnumRoomTypeFilter<"RoomTypeConfig"> | $Enums.RoomType
    count?: IntFilter<"RoomTypeConfig"> | number
    hut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }, "id" | "hutId_type">

  export type RoomTypeConfigOrderByWithAggregationInput = {
    id?: SortOrder
    hutId?: SortOrder
    type?: SortOrder
    count?: SortOrder
    _count?: RoomTypeConfigCountOrderByAggregateInput
    _avg?: RoomTypeConfigAvgOrderByAggregateInput
    _max?: RoomTypeConfigMaxOrderByAggregateInput
    _min?: RoomTypeConfigMinOrderByAggregateInput
    _sum?: RoomTypeConfigSumOrderByAggregateInput
  }

  export type RoomTypeConfigScalarWhereWithAggregatesInput = {
    AND?: RoomTypeConfigScalarWhereWithAggregatesInput | RoomTypeConfigScalarWhereWithAggregatesInput[]
    OR?: RoomTypeConfigScalarWhereWithAggregatesInput[]
    NOT?: RoomTypeConfigScalarWhereWithAggregatesInput | RoomTypeConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomTypeConfig"> | string
    hutId?: StringWithAggregatesFilter<"RoomTypeConfig"> | string
    type?: EnumRoomTypeWithAggregatesFilter<"RoomTypeConfig"> | $Enums.RoomType
    count?: IntWithAggregatesFilter<"RoomTypeConfig"> | number
  }

  export type RouteWhereInput = {
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    id?: StringFilter<"Route"> | string
    fromHutId?: StringFilter<"Route"> | string
    toHutId?: StringFilter<"Route"> | string
    distance?: FloatFilter<"Route"> | number
    ascent?: IntFilter<"Route"> | number
    descent?: IntFilter<"Route"> | number
    estimatedDuration?: FloatFilter<"Route"> | number
    difficulty?: EnumDifficultyFilter<"Route"> | $Enums.Difficulty
    dataSource?: EnumDataSourceFilter<"Route"> | $Enums.DataSource
    gpxTrack?: JsonNullableFilter<"Route">
    fromHut?: XOR<HutScalarRelationFilter, HutWhereInput>
    toHut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }

  export type RouteOrderByWithRelationInput = {
    id?: SortOrder
    fromHutId?: SortOrder
    toHutId?: SortOrder
    distance?: SortOrder
    ascent?: SortOrder
    descent?: SortOrder
    estimatedDuration?: SortOrder
    difficulty?: SortOrder
    dataSource?: SortOrder
    gpxTrack?: SortOrderInput | SortOrder
    fromHut?: HutOrderByWithRelationInput
    toHut?: HutOrderByWithRelationInput
  }

  export type RouteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fromHutId_toHutId?: RouteFromHutIdToHutIdCompoundUniqueInput
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    fromHutId?: StringFilter<"Route"> | string
    toHutId?: StringFilter<"Route"> | string
    distance?: FloatFilter<"Route"> | number
    ascent?: IntFilter<"Route"> | number
    descent?: IntFilter<"Route"> | number
    estimatedDuration?: FloatFilter<"Route"> | number
    difficulty?: EnumDifficultyFilter<"Route"> | $Enums.Difficulty
    dataSource?: EnumDataSourceFilter<"Route"> | $Enums.DataSource
    gpxTrack?: JsonNullableFilter<"Route">
    fromHut?: XOR<HutScalarRelationFilter, HutWhereInput>
    toHut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }, "id" | "fromHutId_toHutId">

  export type RouteOrderByWithAggregationInput = {
    id?: SortOrder
    fromHutId?: SortOrder
    toHutId?: SortOrder
    distance?: SortOrder
    ascent?: SortOrder
    descent?: SortOrder
    estimatedDuration?: SortOrder
    difficulty?: SortOrder
    dataSource?: SortOrder
    gpxTrack?: SortOrderInput | SortOrder
    _count?: RouteCountOrderByAggregateInput
    _avg?: RouteAvgOrderByAggregateInput
    _max?: RouteMaxOrderByAggregateInput
    _min?: RouteMinOrderByAggregateInput
    _sum?: RouteSumOrderByAggregateInput
  }

  export type RouteScalarWhereWithAggregatesInput = {
    AND?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    OR?: RouteScalarWhereWithAggregatesInput[]
    NOT?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Route"> | string
    fromHutId?: StringWithAggregatesFilter<"Route"> | string
    toHutId?: StringWithAggregatesFilter<"Route"> | string
    distance?: FloatWithAggregatesFilter<"Route"> | number
    ascent?: IntWithAggregatesFilter<"Route"> | number
    descent?: IntWithAggregatesFilter<"Route"> | number
    estimatedDuration?: FloatWithAggregatesFilter<"Route"> | number
    difficulty?: EnumDifficultyWithAggregatesFilter<"Route"> | $Enums.Difficulty
    dataSource?: EnumDataSourceWithAggregatesFilter<"Route"> | $Enums.DataSource
    gpxTrack?: JsonNullableWithAggregatesFilter<"Route">
  }

  export type TourWhereInput = {
    AND?: TourWhereInput | TourWhereInput[]
    OR?: TourWhereInput[]
    NOT?: TourWhereInput | TourWhereInput[]
    id?: StringFilter<"Tour"> | string
    name?: StringNullableFilter<"Tour"> | string | null
    groupSize?: IntFilter<"Tour"> | number
    totalDays?: IntFilter<"Tour"> | number
    restDays?: IntFilter<"Tour"> | number
    accommodationType?: EnumAccommodationTypeFilter<"Tour"> | $Enums.AccommodationType
    maxBedsPerRoom?: IntNullableFilter<"Tour"> | number | null
    minDistancePerDay?: FloatNullableFilter<"Tour"> | number | null
    maxDistancePerDay?: FloatNullableFilter<"Tour"> | number | null
    maxAscentPerDay?: IntNullableFilter<"Tour"> | number | null
    dateRangeStart?: DateTimeNullableFilter<"Tour"> | Date | string | null
    dateRangeEnd?: DateTimeNullableFilter<"Tour"> | Date | string | null
    status?: EnumTourStatusFilter<"Tour"> | $Enums.TourStatus
    createdAt?: DateTimeFilter<"Tour"> | Date | string
    huts?: TourHutListRelationFilter
  }

  export type TourOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    groupSize?: SortOrder
    totalDays?: SortOrder
    restDays?: SortOrder
    accommodationType?: SortOrder
    maxBedsPerRoom?: SortOrderInput | SortOrder
    minDistancePerDay?: SortOrderInput | SortOrder
    maxDistancePerDay?: SortOrderInput | SortOrder
    maxAscentPerDay?: SortOrderInput | SortOrder
    dateRangeStart?: SortOrderInput | SortOrder
    dateRangeEnd?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    huts?: TourHutOrderByRelationAggregateInput
  }

  export type TourWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TourWhereInput | TourWhereInput[]
    OR?: TourWhereInput[]
    NOT?: TourWhereInput | TourWhereInput[]
    name?: StringNullableFilter<"Tour"> | string | null
    groupSize?: IntFilter<"Tour"> | number
    totalDays?: IntFilter<"Tour"> | number
    restDays?: IntFilter<"Tour"> | number
    accommodationType?: EnumAccommodationTypeFilter<"Tour"> | $Enums.AccommodationType
    maxBedsPerRoom?: IntNullableFilter<"Tour"> | number | null
    minDistancePerDay?: FloatNullableFilter<"Tour"> | number | null
    maxDistancePerDay?: FloatNullableFilter<"Tour"> | number | null
    maxAscentPerDay?: IntNullableFilter<"Tour"> | number | null
    dateRangeStart?: DateTimeNullableFilter<"Tour"> | Date | string | null
    dateRangeEnd?: DateTimeNullableFilter<"Tour"> | Date | string | null
    status?: EnumTourStatusFilter<"Tour"> | $Enums.TourStatus
    createdAt?: DateTimeFilter<"Tour"> | Date | string
    huts?: TourHutListRelationFilter
  }, "id">

  export type TourOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    groupSize?: SortOrder
    totalDays?: SortOrder
    restDays?: SortOrder
    accommodationType?: SortOrder
    maxBedsPerRoom?: SortOrderInput | SortOrder
    minDistancePerDay?: SortOrderInput | SortOrder
    maxDistancePerDay?: SortOrderInput | SortOrder
    maxAscentPerDay?: SortOrderInput | SortOrder
    dateRangeStart?: SortOrderInput | SortOrder
    dateRangeEnd?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: TourCountOrderByAggregateInput
    _avg?: TourAvgOrderByAggregateInput
    _max?: TourMaxOrderByAggregateInput
    _min?: TourMinOrderByAggregateInput
    _sum?: TourSumOrderByAggregateInput
  }

  export type TourScalarWhereWithAggregatesInput = {
    AND?: TourScalarWhereWithAggregatesInput | TourScalarWhereWithAggregatesInput[]
    OR?: TourScalarWhereWithAggregatesInput[]
    NOT?: TourScalarWhereWithAggregatesInput | TourScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tour"> | string
    name?: StringNullableWithAggregatesFilter<"Tour"> | string | null
    groupSize?: IntWithAggregatesFilter<"Tour"> | number
    totalDays?: IntWithAggregatesFilter<"Tour"> | number
    restDays?: IntWithAggregatesFilter<"Tour"> | number
    accommodationType?: EnumAccommodationTypeWithAggregatesFilter<"Tour"> | $Enums.AccommodationType
    maxBedsPerRoom?: IntNullableWithAggregatesFilter<"Tour"> | number | null
    minDistancePerDay?: FloatNullableWithAggregatesFilter<"Tour"> | number | null
    maxDistancePerDay?: FloatNullableWithAggregatesFilter<"Tour"> | number | null
    maxAscentPerDay?: IntNullableWithAggregatesFilter<"Tour"> | number | null
    dateRangeStart?: DateTimeNullableWithAggregatesFilter<"Tour"> | Date | string | null
    dateRangeEnd?: DateTimeNullableWithAggregatesFilter<"Tour"> | Date | string | null
    status?: EnumTourStatusWithAggregatesFilter<"Tour"> | $Enums.TourStatus
    createdAt?: DateTimeWithAggregatesFilter<"Tour"> | Date | string
  }

  export type TourHutWhereInput = {
    AND?: TourHutWhereInput | TourHutWhereInput[]
    OR?: TourHutWhereInput[]
    NOT?: TourHutWhereInput | TourHutWhereInput[]
    id?: StringFilter<"TourHut"> | string
    tourId?: StringFilter<"TourHut"> | string
    hutId?: StringFilter<"TourHut"> | string
    dayNumber?: IntFilter<"TourHut"> | number
    tour?: XOR<TourScalarRelationFilter, TourWhereInput>
    hut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }

  export type TourHutOrderByWithRelationInput = {
    id?: SortOrder
    tourId?: SortOrder
    hutId?: SortOrder
    dayNumber?: SortOrder
    tour?: TourOrderByWithRelationInput
    hut?: HutOrderByWithRelationInput
  }

  export type TourHutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tourId_dayNumber?: TourHutTourIdDayNumberCompoundUniqueInput
    AND?: TourHutWhereInput | TourHutWhereInput[]
    OR?: TourHutWhereInput[]
    NOT?: TourHutWhereInput | TourHutWhereInput[]
    tourId?: StringFilter<"TourHut"> | string
    hutId?: StringFilter<"TourHut"> | string
    dayNumber?: IntFilter<"TourHut"> | number
    tour?: XOR<TourScalarRelationFilter, TourWhereInput>
    hut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }, "id" | "tourId_dayNumber">

  export type TourHutOrderByWithAggregationInput = {
    id?: SortOrder
    tourId?: SortOrder
    hutId?: SortOrder
    dayNumber?: SortOrder
    _count?: TourHutCountOrderByAggregateInput
    _avg?: TourHutAvgOrderByAggregateInput
    _max?: TourHutMaxOrderByAggregateInput
    _min?: TourHutMinOrderByAggregateInput
    _sum?: TourHutSumOrderByAggregateInput
  }

  export type TourHutScalarWhereWithAggregatesInput = {
    AND?: TourHutScalarWhereWithAggregatesInput | TourHutScalarWhereWithAggregatesInput[]
    OR?: TourHutScalarWhereWithAggregatesInput[]
    NOT?: TourHutScalarWhereWithAggregatesInput | TourHutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TourHut"> | string
    tourId?: StringWithAggregatesFilter<"TourHut"> | string
    hutId?: StringWithAggregatesFilter<"TourHut"> | string
    dayNumber?: IntWithAggregatesFilter<"TourHut"> | number
  }

  export type AvailabilityCheckWhereInput = {
    AND?: AvailabilityCheckWhereInput | AvailabilityCheckWhereInput[]
    OR?: AvailabilityCheckWhereInput[]
    NOT?: AvailabilityCheckWhereInput | AvailabilityCheckWhereInput[]
    id?: StringFilter<"AvailabilityCheck"> | string
    hutId?: StringFilter<"AvailabilityCheck"> | string
    date?: DateTimeFilter<"AvailabilityCheck"> | Date | string
    roomType?: EnumRoomTypeFilter<"AvailabilityCheck"> | $Enums.RoomType
    available?: IntFilter<"AvailabilityCheck"> | number
    checkedAt?: DateTimeFilter<"AvailabilityCheck"> | Date | string
    source?: EnumBookingSystemFilter<"AvailabilityCheck"> | $Enums.BookingSystem
    hut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }

  export type AvailabilityCheckOrderByWithRelationInput = {
    id?: SortOrder
    hutId?: SortOrder
    date?: SortOrder
    roomType?: SortOrder
    available?: SortOrder
    checkedAt?: SortOrder
    source?: SortOrder
    hut?: HutOrderByWithRelationInput
  }

  export type AvailabilityCheckWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hutId_date_roomType?: AvailabilityCheckHutIdDateRoomTypeCompoundUniqueInput
    AND?: AvailabilityCheckWhereInput | AvailabilityCheckWhereInput[]
    OR?: AvailabilityCheckWhereInput[]
    NOT?: AvailabilityCheckWhereInput | AvailabilityCheckWhereInput[]
    hutId?: StringFilter<"AvailabilityCheck"> | string
    date?: DateTimeFilter<"AvailabilityCheck"> | Date | string
    roomType?: EnumRoomTypeFilter<"AvailabilityCheck"> | $Enums.RoomType
    available?: IntFilter<"AvailabilityCheck"> | number
    checkedAt?: DateTimeFilter<"AvailabilityCheck"> | Date | string
    source?: EnumBookingSystemFilter<"AvailabilityCheck"> | $Enums.BookingSystem
    hut?: XOR<HutScalarRelationFilter, HutWhereInput>
  }, "id" | "hutId_date_roomType">

  export type AvailabilityCheckOrderByWithAggregationInput = {
    id?: SortOrder
    hutId?: SortOrder
    date?: SortOrder
    roomType?: SortOrder
    available?: SortOrder
    checkedAt?: SortOrder
    source?: SortOrder
    _count?: AvailabilityCheckCountOrderByAggregateInput
    _avg?: AvailabilityCheckAvgOrderByAggregateInput
    _max?: AvailabilityCheckMaxOrderByAggregateInput
    _min?: AvailabilityCheckMinOrderByAggregateInput
    _sum?: AvailabilityCheckSumOrderByAggregateInput
  }

  export type AvailabilityCheckScalarWhereWithAggregatesInput = {
    AND?: AvailabilityCheckScalarWhereWithAggregatesInput | AvailabilityCheckScalarWhereWithAggregatesInput[]
    OR?: AvailabilityCheckScalarWhereWithAggregatesInput[]
    NOT?: AvailabilityCheckScalarWhereWithAggregatesInput | AvailabilityCheckScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailabilityCheck"> | string
    hutId?: StringWithAggregatesFilter<"AvailabilityCheck"> | string
    date?: DateTimeWithAggregatesFilter<"AvailabilityCheck"> | Date | string
    roomType?: EnumRoomTypeWithAggregatesFilter<"AvailabilityCheck"> | $Enums.RoomType
    available?: IntWithAggregatesFilter<"AvailabilityCheck"> | number
    checkedAt?: DateTimeWithAggregatesFilter<"AvailabilityCheck"> | Date | string
    source?: EnumBookingSystemWithAggregatesFilter<"AvailabilityCheck"> | $Enums.BookingSystem
  }

  export type RegionCreateInput = {
    id?: string
    name: string
    slug: string
    boundingBoxMinLat: number
    boundingBoxMinLng: number
    boundingBoxMaxLat: number
    boundingBoxMaxLng: number
    centerLat: number
    centerLng: number
    huts?: HutCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    boundingBoxMinLat: number
    boundingBoxMinLng: number
    boundingBoxMaxLat: number
    boundingBoxMaxLng: number
    centerLat: number
    centerLng: number
    huts?: HutUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    boundingBoxMinLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMinLng?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLng?: FloatFieldUpdateOperationsInput | number
    centerLat?: FloatFieldUpdateOperationsInput | number
    centerLng?: FloatFieldUpdateOperationsInput | number
    huts?: HutUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    boundingBoxMinLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMinLng?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLng?: FloatFieldUpdateOperationsInput | number
    centerLat?: FloatFieldUpdateOperationsInput | number
    centerLng?: FloatFieldUpdateOperationsInput | number
    huts?: HutUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionCreateManyInput = {
    id?: string
    name: string
    slug: string
    boundingBoxMinLat: number
    boundingBoxMinLng: number
    boundingBoxMaxLat: number
    boundingBoxMaxLng: number
    centerLat: number
    centerLng: number
  }

  export type RegionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    boundingBoxMinLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMinLng?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLng?: FloatFieldUpdateOperationsInput | number
    centerLat?: FloatFieldUpdateOperationsInput | number
    centerLng?: FloatFieldUpdateOperationsInput | number
  }

  export type RegionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    boundingBoxMinLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMinLng?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLng?: FloatFieldUpdateOperationsInput | number
    centerLat?: FloatFieldUpdateOperationsInput | number
    centerLng?: FloatFieldUpdateOperationsInput | number
  }

  export type HutCreateInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    region: RegionCreateNestedOneWithoutHutsInput
    roomTypes?: RoomTypeConfigCreateNestedManyWithoutHutInput
    routesFrom?: RouteCreateNestedManyWithoutFromHutInput
    routesTo?: RouteCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckCreateNestedManyWithoutHutInput
    tourHuts?: TourHutCreateNestedManyWithoutHutInput
  }

  export type HutUncheckedCreateInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    regionId: string
    roomTypes?: RoomTypeConfigUncheckedCreateNestedManyWithoutHutInput
    routesFrom?: RouteUncheckedCreateNestedManyWithoutFromHutInput
    routesTo?: RouteUncheckedCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckUncheckedCreateNestedManyWithoutHutInput
    tourHuts?: TourHutUncheckedCreateNestedManyWithoutHutInput
  }

  export type HutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    region?: RegionUpdateOneRequiredWithoutHutsNestedInput
    roomTypes?: RoomTypeConfigUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    regionId?: StringFieldUpdateOperationsInput | string
    roomTypes?: RoomTypeConfigUncheckedUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUncheckedUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUncheckedUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUncheckedUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUncheckedUpdateManyWithoutHutNestedInput
  }

  export type HutCreateManyInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    regionId: string
  }

  export type HutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
  }

  export type HutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    regionId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomTypeConfigCreateInput = {
    id?: string
    type: $Enums.RoomType
    count: number
    hut: HutCreateNestedOneWithoutRoomTypesInput
  }

  export type RoomTypeConfigUncheckedCreateInput = {
    id?: string
    hutId: string
    type: $Enums.RoomType
    count: number
  }

  export type RoomTypeConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    count?: IntFieldUpdateOperationsInput | number
    hut?: HutUpdateOneRequiredWithoutRoomTypesNestedInput
  }

  export type RoomTypeConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    count?: IntFieldUpdateOperationsInput | number
  }

  export type RoomTypeConfigCreateManyInput = {
    id?: string
    hutId: string
    type: $Enums.RoomType
    count: number
  }

  export type RoomTypeConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    count?: IntFieldUpdateOperationsInput | number
  }

  export type RoomTypeConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    count?: IntFieldUpdateOperationsInput | number
  }

  export type RouteCreateInput = {
    id?: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
    fromHut: HutCreateNestedOneWithoutRoutesFromInput
    toHut: HutCreateNestedOneWithoutRoutesToInput
  }

  export type RouteUncheckedCreateInput = {
    id?: string
    fromHutId: string
    toHutId: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
    fromHut?: HutUpdateOneRequiredWithoutRoutesFromNestedInput
    toHut?: HutUpdateOneRequiredWithoutRoutesToNestedInput
  }

  export type RouteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromHutId?: StringFieldUpdateOperationsInput | string
    toHutId?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteCreateManyInput = {
    id?: string
    fromHutId: string
    toHutId: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromHutId?: StringFieldUpdateOperationsInput | string
    toHutId?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TourCreateInput = {
    id?: string
    name?: string | null
    groupSize: number
    totalDays: number
    restDays?: number
    accommodationType?: $Enums.AccommodationType
    maxBedsPerRoom?: number | null
    minDistancePerDay?: number | null
    maxDistancePerDay?: number | null
    maxAscentPerDay?: number | null
    dateRangeStart?: Date | string | null
    dateRangeEnd?: Date | string | null
    status?: $Enums.TourStatus
    createdAt?: Date | string
    huts?: TourHutCreateNestedManyWithoutTourInput
  }

  export type TourUncheckedCreateInput = {
    id?: string
    name?: string | null
    groupSize: number
    totalDays: number
    restDays?: number
    accommodationType?: $Enums.AccommodationType
    maxBedsPerRoom?: number | null
    minDistancePerDay?: number | null
    maxDistancePerDay?: number | null
    maxAscentPerDay?: number | null
    dateRangeStart?: Date | string | null
    dateRangeEnd?: Date | string | null
    status?: $Enums.TourStatus
    createdAt?: Date | string
    huts?: TourHutUncheckedCreateNestedManyWithoutTourInput
  }

  export type TourUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groupSize?: IntFieldUpdateOperationsInput | number
    totalDays?: IntFieldUpdateOperationsInput | number
    restDays?: IntFieldUpdateOperationsInput | number
    accommodationType?: EnumAccommodationTypeFieldUpdateOperationsInput | $Enums.AccommodationType
    maxBedsPerRoom?: NullableIntFieldUpdateOperationsInput | number | null
    minDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAscentPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    dateRangeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateRangeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTourStatusFieldUpdateOperationsInput | $Enums.TourStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    huts?: TourHutUpdateManyWithoutTourNestedInput
  }

  export type TourUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groupSize?: IntFieldUpdateOperationsInput | number
    totalDays?: IntFieldUpdateOperationsInput | number
    restDays?: IntFieldUpdateOperationsInput | number
    accommodationType?: EnumAccommodationTypeFieldUpdateOperationsInput | $Enums.AccommodationType
    maxBedsPerRoom?: NullableIntFieldUpdateOperationsInput | number | null
    minDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAscentPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    dateRangeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateRangeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTourStatusFieldUpdateOperationsInput | $Enums.TourStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    huts?: TourHutUncheckedUpdateManyWithoutTourNestedInput
  }

  export type TourCreateManyInput = {
    id?: string
    name?: string | null
    groupSize: number
    totalDays: number
    restDays?: number
    accommodationType?: $Enums.AccommodationType
    maxBedsPerRoom?: number | null
    minDistancePerDay?: number | null
    maxDistancePerDay?: number | null
    maxAscentPerDay?: number | null
    dateRangeStart?: Date | string | null
    dateRangeEnd?: Date | string | null
    status?: $Enums.TourStatus
    createdAt?: Date | string
  }

  export type TourUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groupSize?: IntFieldUpdateOperationsInput | number
    totalDays?: IntFieldUpdateOperationsInput | number
    restDays?: IntFieldUpdateOperationsInput | number
    accommodationType?: EnumAccommodationTypeFieldUpdateOperationsInput | $Enums.AccommodationType
    maxBedsPerRoom?: NullableIntFieldUpdateOperationsInput | number | null
    minDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAscentPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    dateRangeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateRangeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTourStatusFieldUpdateOperationsInput | $Enums.TourStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groupSize?: IntFieldUpdateOperationsInput | number
    totalDays?: IntFieldUpdateOperationsInput | number
    restDays?: IntFieldUpdateOperationsInput | number
    accommodationType?: EnumAccommodationTypeFieldUpdateOperationsInput | $Enums.AccommodationType
    maxBedsPerRoom?: NullableIntFieldUpdateOperationsInput | number | null
    minDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAscentPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    dateRangeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateRangeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTourStatusFieldUpdateOperationsInput | $Enums.TourStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourHutCreateInput = {
    id?: string
    dayNumber: number
    tour: TourCreateNestedOneWithoutHutsInput
    hut: HutCreateNestedOneWithoutTourHutsInput
  }

  export type TourHutUncheckedCreateInput = {
    id?: string
    tourId: string
    hutId: string
    dayNumber: number
  }

  export type TourHutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    tour?: TourUpdateOneRequiredWithoutHutsNestedInput
    hut?: HutUpdateOneRequiredWithoutTourHutsNestedInput
  }

  export type TourHutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourId?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type TourHutCreateManyInput = {
    id?: string
    tourId: string
    hutId: string
    dayNumber: number
  }

  export type TourHutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type TourHutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourId?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type AvailabilityCheckCreateInput = {
    id?: string
    date: Date | string
    roomType: $Enums.RoomType
    available: number
    checkedAt?: Date | string
    source: $Enums.BookingSystem
    hut: HutCreateNestedOneWithoutAvailabilityInput
  }

  export type AvailabilityCheckUncheckedCreateInput = {
    id?: string
    hutId: string
    date: Date | string
    roomType: $Enums.RoomType
    available: number
    checkedAt?: Date | string
    source: $Enums.BookingSystem
  }

  export type AvailabilityCheckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    available?: IntFieldUpdateOperationsInput | number
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    hut?: HutUpdateOneRequiredWithoutAvailabilityNestedInput
  }

  export type AvailabilityCheckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    available?: IntFieldUpdateOperationsInput | number
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
  }

  export type AvailabilityCheckCreateManyInput = {
    id?: string
    hutId: string
    date: Date | string
    roomType: $Enums.RoomType
    available: number
    checkedAt?: Date | string
    source: $Enums.BookingSystem
  }

  export type AvailabilityCheckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    available?: IntFieldUpdateOperationsInput | number
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
  }

  export type AvailabilityCheckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    available?: IntFieldUpdateOperationsInput | number
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type HutListRelationFilter = {
    every?: HutWhereInput
    some?: HutWhereInput
    none?: HutWhereInput
  }

  export type HutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    boundingBoxMinLat?: SortOrder
    boundingBoxMinLng?: SortOrder
    boundingBoxMaxLat?: SortOrder
    boundingBoxMaxLng?: SortOrder
    centerLat?: SortOrder
    centerLng?: SortOrder
  }

  export type RegionAvgOrderByAggregateInput = {
    boundingBoxMinLat?: SortOrder
    boundingBoxMinLng?: SortOrder
    boundingBoxMaxLat?: SortOrder
    boundingBoxMaxLng?: SortOrder
    centerLat?: SortOrder
    centerLng?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    boundingBoxMinLat?: SortOrder
    boundingBoxMinLng?: SortOrder
    boundingBoxMaxLat?: SortOrder
    boundingBoxMaxLng?: SortOrder
    centerLat?: SortOrder
    centerLng?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    boundingBoxMinLat?: SortOrder
    boundingBoxMinLng?: SortOrder
    boundingBoxMaxLat?: SortOrder
    boundingBoxMaxLng?: SortOrder
    centerLat?: SortOrder
    centerLng?: SortOrder
  }

  export type RegionSumOrderByAggregateInput = {
    boundingBoxMinLat?: SortOrder
    boundingBoxMinLng?: SortOrder
    boundingBoxMaxLat?: SortOrder
    boundingBoxMaxLng?: SortOrder
    centerLat?: SortOrder
    centerLng?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumBookingSystemFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSystem | EnumBookingSystemFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSystemFilter<$PrismaModel> | $Enums.BookingSystem
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumDataSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceFilter<$PrismaModel> | $Enums.DataSource
  }

  export type RegionScalarRelationFilter = {
    is?: RegionWhereInput
    isNot?: RegionWhereInput
  }

  export type RoomTypeConfigListRelationFilter = {
    every?: RoomTypeConfigWhereInput
    some?: RoomTypeConfigWhereInput
    none?: RoomTypeConfigWhereInput
  }

  export type RouteListRelationFilter = {
    every?: RouteWhereInput
    some?: RouteWhereInput
    none?: RouteWhereInput
  }

  export type AvailabilityCheckListRelationFilter = {
    every?: AvailabilityCheckWhereInput
    some?: AvailabilityCheckWhereInput
    none?: AvailabilityCheckWhereInput
  }

  export type TourHutListRelationFilter = {
    every?: TourHutWhereInput
    some?: TourHutWhereInput
    none?: TourHutWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoomTypeConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RouteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvailabilityCheckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TourHutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HutCountOrderByAggregateInput = {
    id?: SortOrder
    osmId?: SortOrder
    name?: SortOrder
    altitude?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    capacity?: SortOrder
    operator?: SortOrder
    website?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    openingHours?: SortOrder
    bookingUrl?: SortOrder
    bookingSystem?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrder
    amenities?: SortOrder
    dataSource?: SortOrder
    regionId?: SortOrder
  }

  export type HutAvgOrderByAggregateInput = {
    osmId?: SortOrder
    altitude?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    capacity?: SortOrder
  }

  export type HutMaxOrderByAggregateInput = {
    id?: SortOrder
    osmId?: SortOrder
    name?: SortOrder
    altitude?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    capacity?: SortOrder
    operator?: SortOrder
    website?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    openingHours?: SortOrder
    bookingUrl?: SortOrder
    bookingSystem?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrder
    dataSource?: SortOrder
    regionId?: SortOrder
  }

  export type HutMinOrderByAggregateInput = {
    id?: SortOrder
    osmId?: SortOrder
    name?: SortOrder
    altitude?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    capacity?: SortOrder
    operator?: SortOrder
    website?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    openingHours?: SortOrder
    bookingUrl?: SortOrder
    bookingSystem?: SortOrder
    imageUrl?: SortOrder
    description?: SortOrder
    dataSource?: SortOrder
    regionId?: SortOrder
  }

  export type HutSumOrderByAggregateInput = {
    osmId?: SortOrder
    altitude?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    capacity?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumBookingSystemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSystem | EnumBookingSystemFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSystemWithAggregatesFilter<$PrismaModel> | $Enums.BookingSystem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingSystemFilter<$PrismaModel>
    _max?: NestedEnumBookingSystemFilter<$PrismaModel>
  }

  export type EnumDataSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceWithAggregatesFilter<$PrismaModel> | $Enums.DataSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDataSourceFilter<$PrismaModel>
    _max?: NestedEnumDataSourceFilter<$PrismaModel>
  }

  export type EnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType
  }

  export type HutScalarRelationFilter = {
    is?: HutWhereInput
    isNot?: HutWhereInput
  }

  export type RoomTypeConfigHutIdTypeCompoundUniqueInput = {
    hutId: string
    type: $Enums.RoomType
  }

  export type RoomTypeConfigCountOrderByAggregateInput = {
    id?: SortOrder
    hutId?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type RoomTypeConfigAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type RoomTypeConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    hutId?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type RoomTypeConfigMinOrderByAggregateInput = {
    id?: SortOrder
    hutId?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type RoomTypeConfigSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type EnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoomType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>
  }

  export type EnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RouteFromHutIdToHutIdCompoundUniqueInput = {
    fromHutId: string
    toHutId: string
  }

  export type RouteCountOrderByAggregateInput = {
    id?: SortOrder
    fromHutId?: SortOrder
    toHutId?: SortOrder
    distance?: SortOrder
    ascent?: SortOrder
    descent?: SortOrder
    estimatedDuration?: SortOrder
    difficulty?: SortOrder
    dataSource?: SortOrder
    gpxTrack?: SortOrder
  }

  export type RouteAvgOrderByAggregateInput = {
    distance?: SortOrder
    ascent?: SortOrder
    descent?: SortOrder
    estimatedDuration?: SortOrder
  }

  export type RouteMaxOrderByAggregateInput = {
    id?: SortOrder
    fromHutId?: SortOrder
    toHutId?: SortOrder
    distance?: SortOrder
    ascent?: SortOrder
    descent?: SortOrder
    estimatedDuration?: SortOrder
    difficulty?: SortOrder
    dataSource?: SortOrder
  }

  export type RouteMinOrderByAggregateInput = {
    id?: SortOrder
    fromHutId?: SortOrder
    toHutId?: SortOrder
    distance?: SortOrder
    ascent?: SortOrder
    descent?: SortOrder
    estimatedDuration?: SortOrder
    difficulty?: SortOrder
    dataSource?: SortOrder
  }

  export type RouteSumOrderByAggregateInput = {
    distance?: SortOrder
    ascent?: SortOrder
    descent?: SortOrder
    estimatedDuration?: SortOrder
  }

  export type EnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAccommodationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccommodationType | EnumAccommodationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccommodationTypeFilter<$PrismaModel> | $Enums.AccommodationType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumTourStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStatus | EnumTourStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStatusFilter<$PrismaModel> | $Enums.TourStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TourCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    groupSize?: SortOrder
    totalDays?: SortOrder
    restDays?: SortOrder
    accommodationType?: SortOrder
    maxBedsPerRoom?: SortOrder
    minDistancePerDay?: SortOrder
    maxDistancePerDay?: SortOrder
    maxAscentPerDay?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TourAvgOrderByAggregateInput = {
    groupSize?: SortOrder
    totalDays?: SortOrder
    restDays?: SortOrder
    maxBedsPerRoom?: SortOrder
    minDistancePerDay?: SortOrder
    maxDistancePerDay?: SortOrder
    maxAscentPerDay?: SortOrder
  }

  export type TourMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    groupSize?: SortOrder
    totalDays?: SortOrder
    restDays?: SortOrder
    accommodationType?: SortOrder
    maxBedsPerRoom?: SortOrder
    minDistancePerDay?: SortOrder
    maxDistancePerDay?: SortOrder
    maxAscentPerDay?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TourMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    groupSize?: SortOrder
    totalDays?: SortOrder
    restDays?: SortOrder
    accommodationType?: SortOrder
    maxBedsPerRoom?: SortOrder
    minDistancePerDay?: SortOrder
    maxDistancePerDay?: SortOrder
    maxAscentPerDay?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TourSumOrderByAggregateInput = {
    groupSize?: SortOrder
    totalDays?: SortOrder
    restDays?: SortOrder
    maxBedsPerRoom?: SortOrder
    minDistancePerDay?: SortOrder
    maxDistancePerDay?: SortOrder
    maxAscentPerDay?: SortOrder
  }

  export type EnumAccommodationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccommodationType | EnumAccommodationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccommodationTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccommodationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccommodationTypeFilter<$PrismaModel>
    _max?: NestedEnumAccommodationTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTourStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStatus | EnumTourStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStatusWithAggregatesFilter<$PrismaModel> | $Enums.TourStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTourStatusFilter<$PrismaModel>
    _max?: NestedEnumTourStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TourScalarRelationFilter = {
    is?: TourWhereInput
    isNot?: TourWhereInput
  }

  export type TourHutTourIdDayNumberCompoundUniqueInput = {
    tourId: string
    dayNumber: number
  }

  export type TourHutCountOrderByAggregateInput = {
    id?: SortOrder
    tourId?: SortOrder
    hutId?: SortOrder
    dayNumber?: SortOrder
  }

  export type TourHutAvgOrderByAggregateInput = {
    dayNumber?: SortOrder
  }

  export type TourHutMaxOrderByAggregateInput = {
    id?: SortOrder
    tourId?: SortOrder
    hutId?: SortOrder
    dayNumber?: SortOrder
  }

  export type TourHutMinOrderByAggregateInput = {
    id?: SortOrder
    tourId?: SortOrder
    hutId?: SortOrder
    dayNumber?: SortOrder
  }

  export type TourHutSumOrderByAggregateInput = {
    dayNumber?: SortOrder
  }

  export type AvailabilityCheckHutIdDateRoomTypeCompoundUniqueInput = {
    hutId: string
    date: Date | string
    roomType: $Enums.RoomType
  }

  export type AvailabilityCheckCountOrderByAggregateInput = {
    id?: SortOrder
    hutId?: SortOrder
    date?: SortOrder
    roomType?: SortOrder
    available?: SortOrder
    checkedAt?: SortOrder
    source?: SortOrder
  }

  export type AvailabilityCheckAvgOrderByAggregateInput = {
    available?: SortOrder
  }

  export type AvailabilityCheckMaxOrderByAggregateInput = {
    id?: SortOrder
    hutId?: SortOrder
    date?: SortOrder
    roomType?: SortOrder
    available?: SortOrder
    checkedAt?: SortOrder
    source?: SortOrder
  }

  export type AvailabilityCheckMinOrderByAggregateInput = {
    id?: SortOrder
    hutId?: SortOrder
    date?: SortOrder
    roomType?: SortOrder
    available?: SortOrder
    checkedAt?: SortOrder
    source?: SortOrder
  }

  export type AvailabilityCheckSumOrderByAggregateInput = {
    available?: SortOrder
  }

  export type HutCreateNestedManyWithoutRegionInput = {
    create?: XOR<HutCreateWithoutRegionInput, HutUncheckedCreateWithoutRegionInput> | HutCreateWithoutRegionInput[] | HutUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: HutCreateOrConnectWithoutRegionInput | HutCreateOrConnectWithoutRegionInput[]
    createMany?: HutCreateManyRegionInputEnvelope
    connect?: HutWhereUniqueInput | HutWhereUniqueInput[]
  }

  export type HutUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<HutCreateWithoutRegionInput, HutUncheckedCreateWithoutRegionInput> | HutCreateWithoutRegionInput[] | HutUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: HutCreateOrConnectWithoutRegionInput | HutCreateOrConnectWithoutRegionInput[]
    createMany?: HutCreateManyRegionInputEnvelope
    connect?: HutWhereUniqueInput | HutWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type HutUpdateManyWithoutRegionNestedInput = {
    create?: XOR<HutCreateWithoutRegionInput, HutUncheckedCreateWithoutRegionInput> | HutCreateWithoutRegionInput[] | HutUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: HutCreateOrConnectWithoutRegionInput | HutCreateOrConnectWithoutRegionInput[]
    upsert?: HutUpsertWithWhereUniqueWithoutRegionInput | HutUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: HutCreateManyRegionInputEnvelope
    set?: HutWhereUniqueInput | HutWhereUniqueInput[]
    disconnect?: HutWhereUniqueInput | HutWhereUniqueInput[]
    delete?: HutWhereUniqueInput | HutWhereUniqueInput[]
    connect?: HutWhereUniqueInput | HutWhereUniqueInput[]
    update?: HutUpdateWithWhereUniqueWithoutRegionInput | HutUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: HutUpdateManyWithWhereWithoutRegionInput | HutUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: HutScalarWhereInput | HutScalarWhereInput[]
  }

  export type HutUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<HutCreateWithoutRegionInput, HutUncheckedCreateWithoutRegionInput> | HutCreateWithoutRegionInput[] | HutUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: HutCreateOrConnectWithoutRegionInput | HutCreateOrConnectWithoutRegionInput[]
    upsert?: HutUpsertWithWhereUniqueWithoutRegionInput | HutUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: HutCreateManyRegionInputEnvelope
    set?: HutWhereUniqueInput | HutWhereUniqueInput[]
    disconnect?: HutWhereUniqueInput | HutWhereUniqueInput[]
    delete?: HutWhereUniqueInput | HutWhereUniqueInput[]
    connect?: HutWhereUniqueInput | HutWhereUniqueInput[]
    update?: HutUpdateWithWhereUniqueWithoutRegionInput | HutUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: HutUpdateManyWithWhereWithoutRegionInput | HutUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: HutScalarWhereInput | HutScalarWhereInput[]
  }

  export type HutCreateamenitiesInput = {
    set: string[]
  }

  export type RegionCreateNestedOneWithoutHutsInput = {
    create?: XOR<RegionCreateWithoutHutsInput, RegionUncheckedCreateWithoutHutsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutHutsInput
    connect?: RegionWhereUniqueInput
  }

  export type RoomTypeConfigCreateNestedManyWithoutHutInput = {
    create?: XOR<RoomTypeConfigCreateWithoutHutInput, RoomTypeConfigUncheckedCreateWithoutHutInput> | RoomTypeConfigCreateWithoutHutInput[] | RoomTypeConfigUncheckedCreateWithoutHutInput[]
    connectOrCreate?: RoomTypeConfigCreateOrConnectWithoutHutInput | RoomTypeConfigCreateOrConnectWithoutHutInput[]
    createMany?: RoomTypeConfigCreateManyHutInputEnvelope
    connect?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
  }

  export type RouteCreateNestedManyWithoutFromHutInput = {
    create?: XOR<RouteCreateWithoutFromHutInput, RouteUncheckedCreateWithoutFromHutInput> | RouteCreateWithoutFromHutInput[] | RouteUncheckedCreateWithoutFromHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutFromHutInput | RouteCreateOrConnectWithoutFromHutInput[]
    createMany?: RouteCreateManyFromHutInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RouteCreateNestedManyWithoutToHutInput = {
    create?: XOR<RouteCreateWithoutToHutInput, RouteUncheckedCreateWithoutToHutInput> | RouteCreateWithoutToHutInput[] | RouteUncheckedCreateWithoutToHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutToHutInput | RouteCreateOrConnectWithoutToHutInput[]
    createMany?: RouteCreateManyToHutInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type AvailabilityCheckCreateNestedManyWithoutHutInput = {
    create?: XOR<AvailabilityCheckCreateWithoutHutInput, AvailabilityCheckUncheckedCreateWithoutHutInput> | AvailabilityCheckCreateWithoutHutInput[] | AvailabilityCheckUncheckedCreateWithoutHutInput[]
    connectOrCreate?: AvailabilityCheckCreateOrConnectWithoutHutInput | AvailabilityCheckCreateOrConnectWithoutHutInput[]
    createMany?: AvailabilityCheckCreateManyHutInputEnvelope
    connect?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
  }

  export type TourHutCreateNestedManyWithoutHutInput = {
    create?: XOR<TourHutCreateWithoutHutInput, TourHutUncheckedCreateWithoutHutInput> | TourHutCreateWithoutHutInput[] | TourHutUncheckedCreateWithoutHutInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutHutInput | TourHutCreateOrConnectWithoutHutInput[]
    createMany?: TourHutCreateManyHutInputEnvelope
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
  }

  export type RoomTypeConfigUncheckedCreateNestedManyWithoutHutInput = {
    create?: XOR<RoomTypeConfigCreateWithoutHutInput, RoomTypeConfigUncheckedCreateWithoutHutInput> | RoomTypeConfigCreateWithoutHutInput[] | RoomTypeConfigUncheckedCreateWithoutHutInput[]
    connectOrCreate?: RoomTypeConfigCreateOrConnectWithoutHutInput | RoomTypeConfigCreateOrConnectWithoutHutInput[]
    createMany?: RoomTypeConfigCreateManyHutInputEnvelope
    connect?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
  }

  export type RouteUncheckedCreateNestedManyWithoutFromHutInput = {
    create?: XOR<RouteCreateWithoutFromHutInput, RouteUncheckedCreateWithoutFromHutInput> | RouteCreateWithoutFromHutInput[] | RouteUncheckedCreateWithoutFromHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutFromHutInput | RouteCreateOrConnectWithoutFromHutInput[]
    createMany?: RouteCreateManyFromHutInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RouteUncheckedCreateNestedManyWithoutToHutInput = {
    create?: XOR<RouteCreateWithoutToHutInput, RouteUncheckedCreateWithoutToHutInput> | RouteCreateWithoutToHutInput[] | RouteUncheckedCreateWithoutToHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutToHutInput | RouteCreateOrConnectWithoutToHutInput[]
    createMany?: RouteCreateManyToHutInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type AvailabilityCheckUncheckedCreateNestedManyWithoutHutInput = {
    create?: XOR<AvailabilityCheckCreateWithoutHutInput, AvailabilityCheckUncheckedCreateWithoutHutInput> | AvailabilityCheckCreateWithoutHutInput[] | AvailabilityCheckUncheckedCreateWithoutHutInput[]
    connectOrCreate?: AvailabilityCheckCreateOrConnectWithoutHutInput | AvailabilityCheckCreateOrConnectWithoutHutInput[]
    createMany?: AvailabilityCheckCreateManyHutInputEnvelope
    connect?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
  }

  export type TourHutUncheckedCreateNestedManyWithoutHutInput = {
    create?: XOR<TourHutCreateWithoutHutInput, TourHutUncheckedCreateWithoutHutInput> | TourHutCreateWithoutHutInput[] | TourHutUncheckedCreateWithoutHutInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutHutInput | TourHutCreateOrConnectWithoutHutInput[]
    createMany?: TourHutCreateManyHutInputEnvelope
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumBookingSystemFieldUpdateOperationsInput = {
    set?: $Enums.BookingSystem
  }

  export type HutUpdateamenitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumDataSourceFieldUpdateOperationsInput = {
    set?: $Enums.DataSource
  }

  export type RegionUpdateOneRequiredWithoutHutsNestedInput = {
    create?: XOR<RegionCreateWithoutHutsInput, RegionUncheckedCreateWithoutHutsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutHutsInput
    upsert?: RegionUpsertWithoutHutsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutHutsInput, RegionUpdateWithoutHutsInput>, RegionUncheckedUpdateWithoutHutsInput>
  }

  export type RoomTypeConfigUpdateManyWithoutHutNestedInput = {
    create?: XOR<RoomTypeConfigCreateWithoutHutInput, RoomTypeConfigUncheckedCreateWithoutHutInput> | RoomTypeConfigCreateWithoutHutInput[] | RoomTypeConfigUncheckedCreateWithoutHutInput[]
    connectOrCreate?: RoomTypeConfigCreateOrConnectWithoutHutInput | RoomTypeConfigCreateOrConnectWithoutHutInput[]
    upsert?: RoomTypeConfigUpsertWithWhereUniqueWithoutHutInput | RoomTypeConfigUpsertWithWhereUniqueWithoutHutInput[]
    createMany?: RoomTypeConfigCreateManyHutInputEnvelope
    set?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    disconnect?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    delete?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    connect?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    update?: RoomTypeConfigUpdateWithWhereUniqueWithoutHutInput | RoomTypeConfigUpdateWithWhereUniqueWithoutHutInput[]
    updateMany?: RoomTypeConfigUpdateManyWithWhereWithoutHutInput | RoomTypeConfigUpdateManyWithWhereWithoutHutInput[]
    deleteMany?: RoomTypeConfigScalarWhereInput | RoomTypeConfigScalarWhereInput[]
  }

  export type RouteUpdateManyWithoutFromHutNestedInput = {
    create?: XOR<RouteCreateWithoutFromHutInput, RouteUncheckedCreateWithoutFromHutInput> | RouteCreateWithoutFromHutInput[] | RouteUncheckedCreateWithoutFromHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutFromHutInput | RouteCreateOrConnectWithoutFromHutInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutFromHutInput | RouteUpsertWithWhereUniqueWithoutFromHutInput[]
    createMany?: RouteCreateManyFromHutInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutFromHutInput | RouteUpdateWithWhereUniqueWithoutFromHutInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutFromHutInput | RouteUpdateManyWithWhereWithoutFromHutInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RouteUpdateManyWithoutToHutNestedInput = {
    create?: XOR<RouteCreateWithoutToHutInput, RouteUncheckedCreateWithoutToHutInput> | RouteCreateWithoutToHutInput[] | RouteUncheckedCreateWithoutToHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutToHutInput | RouteCreateOrConnectWithoutToHutInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutToHutInput | RouteUpsertWithWhereUniqueWithoutToHutInput[]
    createMany?: RouteCreateManyToHutInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutToHutInput | RouteUpdateWithWhereUniqueWithoutToHutInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutToHutInput | RouteUpdateManyWithWhereWithoutToHutInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type AvailabilityCheckUpdateManyWithoutHutNestedInput = {
    create?: XOR<AvailabilityCheckCreateWithoutHutInput, AvailabilityCheckUncheckedCreateWithoutHutInput> | AvailabilityCheckCreateWithoutHutInput[] | AvailabilityCheckUncheckedCreateWithoutHutInput[]
    connectOrCreate?: AvailabilityCheckCreateOrConnectWithoutHutInput | AvailabilityCheckCreateOrConnectWithoutHutInput[]
    upsert?: AvailabilityCheckUpsertWithWhereUniqueWithoutHutInput | AvailabilityCheckUpsertWithWhereUniqueWithoutHutInput[]
    createMany?: AvailabilityCheckCreateManyHutInputEnvelope
    set?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    disconnect?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    delete?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    connect?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    update?: AvailabilityCheckUpdateWithWhereUniqueWithoutHutInput | AvailabilityCheckUpdateWithWhereUniqueWithoutHutInput[]
    updateMany?: AvailabilityCheckUpdateManyWithWhereWithoutHutInput | AvailabilityCheckUpdateManyWithWhereWithoutHutInput[]
    deleteMany?: AvailabilityCheckScalarWhereInput | AvailabilityCheckScalarWhereInput[]
  }

  export type TourHutUpdateManyWithoutHutNestedInput = {
    create?: XOR<TourHutCreateWithoutHutInput, TourHutUncheckedCreateWithoutHutInput> | TourHutCreateWithoutHutInput[] | TourHutUncheckedCreateWithoutHutInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutHutInput | TourHutCreateOrConnectWithoutHutInput[]
    upsert?: TourHutUpsertWithWhereUniqueWithoutHutInput | TourHutUpsertWithWhereUniqueWithoutHutInput[]
    createMany?: TourHutCreateManyHutInputEnvelope
    set?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    disconnect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    delete?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    update?: TourHutUpdateWithWhereUniqueWithoutHutInput | TourHutUpdateWithWhereUniqueWithoutHutInput[]
    updateMany?: TourHutUpdateManyWithWhereWithoutHutInput | TourHutUpdateManyWithWhereWithoutHutInput[]
    deleteMany?: TourHutScalarWhereInput | TourHutScalarWhereInput[]
  }

  export type RoomTypeConfigUncheckedUpdateManyWithoutHutNestedInput = {
    create?: XOR<RoomTypeConfigCreateWithoutHutInput, RoomTypeConfigUncheckedCreateWithoutHutInput> | RoomTypeConfigCreateWithoutHutInput[] | RoomTypeConfigUncheckedCreateWithoutHutInput[]
    connectOrCreate?: RoomTypeConfigCreateOrConnectWithoutHutInput | RoomTypeConfigCreateOrConnectWithoutHutInput[]
    upsert?: RoomTypeConfigUpsertWithWhereUniqueWithoutHutInput | RoomTypeConfigUpsertWithWhereUniqueWithoutHutInput[]
    createMany?: RoomTypeConfigCreateManyHutInputEnvelope
    set?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    disconnect?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    delete?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    connect?: RoomTypeConfigWhereUniqueInput | RoomTypeConfigWhereUniqueInput[]
    update?: RoomTypeConfigUpdateWithWhereUniqueWithoutHutInput | RoomTypeConfigUpdateWithWhereUniqueWithoutHutInput[]
    updateMany?: RoomTypeConfigUpdateManyWithWhereWithoutHutInput | RoomTypeConfigUpdateManyWithWhereWithoutHutInput[]
    deleteMany?: RoomTypeConfigScalarWhereInput | RoomTypeConfigScalarWhereInput[]
  }

  export type RouteUncheckedUpdateManyWithoutFromHutNestedInput = {
    create?: XOR<RouteCreateWithoutFromHutInput, RouteUncheckedCreateWithoutFromHutInput> | RouteCreateWithoutFromHutInput[] | RouteUncheckedCreateWithoutFromHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutFromHutInput | RouteCreateOrConnectWithoutFromHutInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutFromHutInput | RouteUpsertWithWhereUniqueWithoutFromHutInput[]
    createMany?: RouteCreateManyFromHutInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutFromHutInput | RouteUpdateWithWhereUniqueWithoutFromHutInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutFromHutInput | RouteUpdateManyWithWhereWithoutFromHutInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RouteUncheckedUpdateManyWithoutToHutNestedInput = {
    create?: XOR<RouteCreateWithoutToHutInput, RouteUncheckedCreateWithoutToHutInput> | RouteCreateWithoutToHutInput[] | RouteUncheckedCreateWithoutToHutInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutToHutInput | RouteCreateOrConnectWithoutToHutInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutToHutInput | RouteUpsertWithWhereUniqueWithoutToHutInput[]
    createMany?: RouteCreateManyToHutInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutToHutInput | RouteUpdateWithWhereUniqueWithoutToHutInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutToHutInput | RouteUpdateManyWithWhereWithoutToHutInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type AvailabilityCheckUncheckedUpdateManyWithoutHutNestedInput = {
    create?: XOR<AvailabilityCheckCreateWithoutHutInput, AvailabilityCheckUncheckedCreateWithoutHutInput> | AvailabilityCheckCreateWithoutHutInput[] | AvailabilityCheckUncheckedCreateWithoutHutInput[]
    connectOrCreate?: AvailabilityCheckCreateOrConnectWithoutHutInput | AvailabilityCheckCreateOrConnectWithoutHutInput[]
    upsert?: AvailabilityCheckUpsertWithWhereUniqueWithoutHutInput | AvailabilityCheckUpsertWithWhereUniqueWithoutHutInput[]
    createMany?: AvailabilityCheckCreateManyHutInputEnvelope
    set?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    disconnect?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    delete?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    connect?: AvailabilityCheckWhereUniqueInput | AvailabilityCheckWhereUniqueInput[]
    update?: AvailabilityCheckUpdateWithWhereUniqueWithoutHutInput | AvailabilityCheckUpdateWithWhereUniqueWithoutHutInput[]
    updateMany?: AvailabilityCheckUpdateManyWithWhereWithoutHutInput | AvailabilityCheckUpdateManyWithWhereWithoutHutInput[]
    deleteMany?: AvailabilityCheckScalarWhereInput | AvailabilityCheckScalarWhereInput[]
  }

  export type TourHutUncheckedUpdateManyWithoutHutNestedInput = {
    create?: XOR<TourHutCreateWithoutHutInput, TourHutUncheckedCreateWithoutHutInput> | TourHutCreateWithoutHutInput[] | TourHutUncheckedCreateWithoutHutInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutHutInput | TourHutCreateOrConnectWithoutHutInput[]
    upsert?: TourHutUpsertWithWhereUniqueWithoutHutInput | TourHutUpsertWithWhereUniqueWithoutHutInput[]
    createMany?: TourHutCreateManyHutInputEnvelope
    set?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    disconnect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    delete?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    update?: TourHutUpdateWithWhereUniqueWithoutHutInput | TourHutUpdateWithWhereUniqueWithoutHutInput[]
    updateMany?: TourHutUpdateManyWithWhereWithoutHutInput | TourHutUpdateManyWithWhereWithoutHutInput[]
    deleteMany?: TourHutScalarWhereInput | TourHutScalarWhereInput[]
  }

  export type HutCreateNestedOneWithoutRoomTypesInput = {
    create?: XOR<HutCreateWithoutRoomTypesInput, HutUncheckedCreateWithoutRoomTypesInput>
    connectOrCreate?: HutCreateOrConnectWithoutRoomTypesInput
    connect?: HutWhereUniqueInput
  }

  export type EnumRoomTypeFieldUpdateOperationsInput = {
    set?: $Enums.RoomType
  }

  export type HutUpdateOneRequiredWithoutRoomTypesNestedInput = {
    create?: XOR<HutCreateWithoutRoomTypesInput, HutUncheckedCreateWithoutRoomTypesInput>
    connectOrCreate?: HutCreateOrConnectWithoutRoomTypesInput
    upsert?: HutUpsertWithoutRoomTypesInput
    connect?: HutWhereUniqueInput
    update?: XOR<XOR<HutUpdateToOneWithWhereWithoutRoomTypesInput, HutUpdateWithoutRoomTypesInput>, HutUncheckedUpdateWithoutRoomTypesInput>
  }

  export type HutCreateNestedOneWithoutRoutesFromInput = {
    create?: XOR<HutCreateWithoutRoutesFromInput, HutUncheckedCreateWithoutRoutesFromInput>
    connectOrCreate?: HutCreateOrConnectWithoutRoutesFromInput
    connect?: HutWhereUniqueInput
  }

  export type HutCreateNestedOneWithoutRoutesToInput = {
    create?: XOR<HutCreateWithoutRoutesToInput, HutUncheckedCreateWithoutRoutesToInput>
    connectOrCreate?: HutCreateOrConnectWithoutRoutesToInput
    connect?: HutWhereUniqueInput
  }

  export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty
  }

  export type HutUpdateOneRequiredWithoutRoutesFromNestedInput = {
    create?: XOR<HutCreateWithoutRoutesFromInput, HutUncheckedCreateWithoutRoutesFromInput>
    connectOrCreate?: HutCreateOrConnectWithoutRoutesFromInput
    upsert?: HutUpsertWithoutRoutesFromInput
    connect?: HutWhereUniqueInput
    update?: XOR<XOR<HutUpdateToOneWithWhereWithoutRoutesFromInput, HutUpdateWithoutRoutesFromInput>, HutUncheckedUpdateWithoutRoutesFromInput>
  }

  export type HutUpdateOneRequiredWithoutRoutesToNestedInput = {
    create?: XOR<HutCreateWithoutRoutesToInput, HutUncheckedCreateWithoutRoutesToInput>
    connectOrCreate?: HutCreateOrConnectWithoutRoutesToInput
    upsert?: HutUpsertWithoutRoutesToInput
    connect?: HutWhereUniqueInput
    update?: XOR<XOR<HutUpdateToOneWithWhereWithoutRoutesToInput, HutUpdateWithoutRoutesToInput>, HutUncheckedUpdateWithoutRoutesToInput>
  }

  export type TourHutCreateNestedManyWithoutTourInput = {
    create?: XOR<TourHutCreateWithoutTourInput, TourHutUncheckedCreateWithoutTourInput> | TourHutCreateWithoutTourInput[] | TourHutUncheckedCreateWithoutTourInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutTourInput | TourHutCreateOrConnectWithoutTourInput[]
    createMany?: TourHutCreateManyTourInputEnvelope
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
  }

  export type TourHutUncheckedCreateNestedManyWithoutTourInput = {
    create?: XOR<TourHutCreateWithoutTourInput, TourHutUncheckedCreateWithoutTourInput> | TourHutCreateWithoutTourInput[] | TourHutUncheckedCreateWithoutTourInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutTourInput | TourHutCreateOrConnectWithoutTourInput[]
    createMany?: TourHutCreateManyTourInputEnvelope
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
  }

  export type EnumAccommodationTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccommodationType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumTourStatusFieldUpdateOperationsInput = {
    set?: $Enums.TourStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TourHutUpdateManyWithoutTourNestedInput = {
    create?: XOR<TourHutCreateWithoutTourInput, TourHutUncheckedCreateWithoutTourInput> | TourHutCreateWithoutTourInput[] | TourHutUncheckedCreateWithoutTourInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutTourInput | TourHutCreateOrConnectWithoutTourInput[]
    upsert?: TourHutUpsertWithWhereUniqueWithoutTourInput | TourHutUpsertWithWhereUniqueWithoutTourInput[]
    createMany?: TourHutCreateManyTourInputEnvelope
    set?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    disconnect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    delete?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    update?: TourHutUpdateWithWhereUniqueWithoutTourInput | TourHutUpdateWithWhereUniqueWithoutTourInput[]
    updateMany?: TourHutUpdateManyWithWhereWithoutTourInput | TourHutUpdateManyWithWhereWithoutTourInput[]
    deleteMany?: TourHutScalarWhereInput | TourHutScalarWhereInput[]
  }

  export type TourHutUncheckedUpdateManyWithoutTourNestedInput = {
    create?: XOR<TourHutCreateWithoutTourInput, TourHutUncheckedCreateWithoutTourInput> | TourHutCreateWithoutTourInput[] | TourHutUncheckedCreateWithoutTourInput[]
    connectOrCreate?: TourHutCreateOrConnectWithoutTourInput | TourHutCreateOrConnectWithoutTourInput[]
    upsert?: TourHutUpsertWithWhereUniqueWithoutTourInput | TourHutUpsertWithWhereUniqueWithoutTourInput[]
    createMany?: TourHutCreateManyTourInputEnvelope
    set?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    disconnect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    delete?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    connect?: TourHutWhereUniqueInput | TourHutWhereUniqueInput[]
    update?: TourHutUpdateWithWhereUniqueWithoutTourInput | TourHutUpdateWithWhereUniqueWithoutTourInput[]
    updateMany?: TourHutUpdateManyWithWhereWithoutTourInput | TourHutUpdateManyWithWhereWithoutTourInput[]
    deleteMany?: TourHutScalarWhereInput | TourHutScalarWhereInput[]
  }

  export type TourCreateNestedOneWithoutHutsInput = {
    create?: XOR<TourCreateWithoutHutsInput, TourUncheckedCreateWithoutHutsInput>
    connectOrCreate?: TourCreateOrConnectWithoutHutsInput
    connect?: TourWhereUniqueInput
  }

  export type HutCreateNestedOneWithoutTourHutsInput = {
    create?: XOR<HutCreateWithoutTourHutsInput, HutUncheckedCreateWithoutTourHutsInput>
    connectOrCreate?: HutCreateOrConnectWithoutTourHutsInput
    connect?: HutWhereUniqueInput
  }

  export type TourUpdateOneRequiredWithoutHutsNestedInput = {
    create?: XOR<TourCreateWithoutHutsInput, TourUncheckedCreateWithoutHutsInput>
    connectOrCreate?: TourCreateOrConnectWithoutHutsInput
    upsert?: TourUpsertWithoutHutsInput
    connect?: TourWhereUniqueInput
    update?: XOR<XOR<TourUpdateToOneWithWhereWithoutHutsInput, TourUpdateWithoutHutsInput>, TourUncheckedUpdateWithoutHutsInput>
  }

  export type HutUpdateOneRequiredWithoutTourHutsNestedInput = {
    create?: XOR<HutCreateWithoutTourHutsInput, HutUncheckedCreateWithoutTourHutsInput>
    connectOrCreate?: HutCreateOrConnectWithoutTourHutsInput
    upsert?: HutUpsertWithoutTourHutsInput
    connect?: HutWhereUniqueInput
    update?: XOR<XOR<HutUpdateToOneWithWhereWithoutTourHutsInput, HutUpdateWithoutTourHutsInput>, HutUncheckedUpdateWithoutTourHutsInput>
  }

  export type HutCreateNestedOneWithoutAvailabilityInput = {
    create?: XOR<HutCreateWithoutAvailabilityInput, HutUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: HutCreateOrConnectWithoutAvailabilityInput
    connect?: HutWhereUniqueInput
  }

  export type HutUpdateOneRequiredWithoutAvailabilityNestedInput = {
    create?: XOR<HutCreateWithoutAvailabilityInput, HutUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: HutCreateOrConnectWithoutAvailabilityInput
    upsert?: HutUpsertWithoutAvailabilityInput
    connect?: HutWhereUniqueInput
    update?: XOR<XOR<HutUpdateToOneWithWhereWithoutAvailabilityInput, HutUpdateWithoutAvailabilityInput>, HutUncheckedUpdateWithoutAvailabilityInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumBookingSystemFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSystem | EnumBookingSystemFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSystemFilter<$PrismaModel> | $Enums.BookingSystem
  }

  export type NestedEnumDataSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceFilter<$PrismaModel> | $Enums.DataSource
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumBookingSystemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingSystem | EnumBookingSystemFieldRefInput<$PrismaModel>
    in?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingSystem[] | ListEnumBookingSystemFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingSystemWithAggregatesFilter<$PrismaModel> | $Enums.BookingSystem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingSystemFilter<$PrismaModel>
    _max?: NestedEnumBookingSystemFilter<$PrismaModel>
  }

  export type NestedEnumDataSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceWithAggregatesFilter<$PrismaModel> | $Enums.DataSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDataSourceFilter<$PrismaModel>
    _max?: NestedEnumDataSourceFilter<$PrismaModel>
  }

  export type NestedEnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType
  }

  export type NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoomType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type NestedEnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAccommodationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccommodationType | EnumAccommodationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccommodationTypeFilter<$PrismaModel> | $Enums.AccommodationType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTourStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStatus | EnumTourStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStatusFilter<$PrismaModel> | $Enums.TourStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumAccommodationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccommodationType | EnumAccommodationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccommodationType[] | ListEnumAccommodationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccommodationTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccommodationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccommodationTypeFilter<$PrismaModel>
    _max?: NestedEnumAccommodationTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTourStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStatus | EnumTourStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStatus[] | ListEnumTourStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStatusWithAggregatesFilter<$PrismaModel> | $Enums.TourStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTourStatusFilter<$PrismaModel>
    _max?: NestedEnumTourStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type HutCreateWithoutRegionInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    roomTypes?: RoomTypeConfigCreateNestedManyWithoutHutInput
    routesFrom?: RouteCreateNestedManyWithoutFromHutInput
    routesTo?: RouteCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckCreateNestedManyWithoutHutInput
    tourHuts?: TourHutCreateNestedManyWithoutHutInput
  }

  export type HutUncheckedCreateWithoutRegionInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    roomTypes?: RoomTypeConfigUncheckedCreateNestedManyWithoutHutInput
    routesFrom?: RouteUncheckedCreateNestedManyWithoutFromHutInput
    routesTo?: RouteUncheckedCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckUncheckedCreateNestedManyWithoutHutInput
    tourHuts?: TourHutUncheckedCreateNestedManyWithoutHutInput
  }

  export type HutCreateOrConnectWithoutRegionInput = {
    where: HutWhereUniqueInput
    create: XOR<HutCreateWithoutRegionInput, HutUncheckedCreateWithoutRegionInput>
  }

  export type HutCreateManyRegionInputEnvelope = {
    data: HutCreateManyRegionInput | HutCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type HutUpsertWithWhereUniqueWithoutRegionInput = {
    where: HutWhereUniqueInput
    update: XOR<HutUpdateWithoutRegionInput, HutUncheckedUpdateWithoutRegionInput>
    create: XOR<HutCreateWithoutRegionInput, HutUncheckedCreateWithoutRegionInput>
  }

  export type HutUpdateWithWhereUniqueWithoutRegionInput = {
    where: HutWhereUniqueInput
    data: XOR<HutUpdateWithoutRegionInput, HutUncheckedUpdateWithoutRegionInput>
  }

  export type HutUpdateManyWithWhereWithoutRegionInput = {
    where: HutScalarWhereInput
    data: XOR<HutUpdateManyMutationInput, HutUncheckedUpdateManyWithoutRegionInput>
  }

  export type HutScalarWhereInput = {
    AND?: HutScalarWhereInput | HutScalarWhereInput[]
    OR?: HutScalarWhereInput[]
    NOT?: HutScalarWhereInput | HutScalarWhereInput[]
    id?: StringFilter<"Hut"> | string
    osmId?: BigIntNullableFilter<"Hut"> | bigint | number | null
    name?: StringFilter<"Hut"> | string
    altitude?: IntFilter<"Hut"> | number
    lat?: FloatFilter<"Hut"> | number
    lng?: FloatFilter<"Hut"> | number
    capacity?: IntFilter<"Hut"> | number
    operator?: StringNullableFilter<"Hut"> | string | null
    website?: StringNullableFilter<"Hut"> | string | null
    phone?: StringNullableFilter<"Hut"> | string | null
    email?: StringNullableFilter<"Hut"> | string | null
    openingHours?: StringNullableFilter<"Hut"> | string | null
    bookingUrl?: StringNullableFilter<"Hut"> | string | null
    bookingSystem?: EnumBookingSystemFilter<"Hut"> | $Enums.BookingSystem
    imageUrl?: StringNullableFilter<"Hut"> | string | null
    description?: StringNullableFilter<"Hut"> | string | null
    amenities?: StringNullableListFilter<"Hut">
    dataSource?: EnumDataSourceFilter<"Hut"> | $Enums.DataSource
    regionId?: StringFilter<"Hut"> | string
  }

  export type RegionCreateWithoutHutsInput = {
    id?: string
    name: string
    slug: string
    boundingBoxMinLat: number
    boundingBoxMinLng: number
    boundingBoxMaxLat: number
    boundingBoxMaxLng: number
    centerLat: number
    centerLng: number
  }

  export type RegionUncheckedCreateWithoutHutsInput = {
    id?: string
    name: string
    slug: string
    boundingBoxMinLat: number
    boundingBoxMinLng: number
    boundingBoxMaxLat: number
    boundingBoxMaxLng: number
    centerLat: number
    centerLng: number
  }

  export type RegionCreateOrConnectWithoutHutsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutHutsInput, RegionUncheckedCreateWithoutHutsInput>
  }

  export type RoomTypeConfigCreateWithoutHutInput = {
    id?: string
    type: $Enums.RoomType
    count: number
  }

  export type RoomTypeConfigUncheckedCreateWithoutHutInput = {
    id?: string
    type: $Enums.RoomType
    count: number
  }

  export type RoomTypeConfigCreateOrConnectWithoutHutInput = {
    where: RoomTypeConfigWhereUniqueInput
    create: XOR<RoomTypeConfigCreateWithoutHutInput, RoomTypeConfigUncheckedCreateWithoutHutInput>
  }

  export type RoomTypeConfigCreateManyHutInputEnvelope = {
    data: RoomTypeConfigCreateManyHutInput | RoomTypeConfigCreateManyHutInput[]
    skipDuplicates?: boolean
  }

  export type RouteCreateWithoutFromHutInput = {
    id?: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
    toHut: HutCreateNestedOneWithoutRoutesToInput
  }

  export type RouteUncheckedCreateWithoutFromHutInput = {
    id?: string
    toHutId: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteCreateOrConnectWithoutFromHutInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutFromHutInput, RouteUncheckedCreateWithoutFromHutInput>
  }

  export type RouteCreateManyFromHutInputEnvelope = {
    data: RouteCreateManyFromHutInput | RouteCreateManyFromHutInput[]
    skipDuplicates?: boolean
  }

  export type RouteCreateWithoutToHutInput = {
    id?: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
    fromHut: HutCreateNestedOneWithoutRoutesFromInput
  }

  export type RouteUncheckedCreateWithoutToHutInput = {
    id?: string
    fromHutId: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteCreateOrConnectWithoutToHutInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutToHutInput, RouteUncheckedCreateWithoutToHutInput>
  }

  export type RouteCreateManyToHutInputEnvelope = {
    data: RouteCreateManyToHutInput | RouteCreateManyToHutInput[]
    skipDuplicates?: boolean
  }

  export type AvailabilityCheckCreateWithoutHutInput = {
    id?: string
    date: Date | string
    roomType: $Enums.RoomType
    available: number
    checkedAt?: Date | string
    source: $Enums.BookingSystem
  }

  export type AvailabilityCheckUncheckedCreateWithoutHutInput = {
    id?: string
    date: Date | string
    roomType: $Enums.RoomType
    available: number
    checkedAt?: Date | string
    source: $Enums.BookingSystem
  }

  export type AvailabilityCheckCreateOrConnectWithoutHutInput = {
    where: AvailabilityCheckWhereUniqueInput
    create: XOR<AvailabilityCheckCreateWithoutHutInput, AvailabilityCheckUncheckedCreateWithoutHutInput>
  }

  export type AvailabilityCheckCreateManyHutInputEnvelope = {
    data: AvailabilityCheckCreateManyHutInput | AvailabilityCheckCreateManyHutInput[]
    skipDuplicates?: boolean
  }

  export type TourHutCreateWithoutHutInput = {
    id?: string
    dayNumber: number
    tour: TourCreateNestedOneWithoutHutsInput
  }

  export type TourHutUncheckedCreateWithoutHutInput = {
    id?: string
    tourId: string
    dayNumber: number
  }

  export type TourHutCreateOrConnectWithoutHutInput = {
    where: TourHutWhereUniqueInput
    create: XOR<TourHutCreateWithoutHutInput, TourHutUncheckedCreateWithoutHutInput>
  }

  export type TourHutCreateManyHutInputEnvelope = {
    data: TourHutCreateManyHutInput | TourHutCreateManyHutInput[]
    skipDuplicates?: boolean
  }

  export type RegionUpsertWithoutHutsInput = {
    update: XOR<RegionUpdateWithoutHutsInput, RegionUncheckedUpdateWithoutHutsInput>
    create: XOR<RegionCreateWithoutHutsInput, RegionUncheckedCreateWithoutHutsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutHutsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutHutsInput, RegionUncheckedUpdateWithoutHutsInput>
  }

  export type RegionUpdateWithoutHutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    boundingBoxMinLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMinLng?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLng?: FloatFieldUpdateOperationsInput | number
    centerLat?: FloatFieldUpdateOperationsInput | number
    centerLng?: FloatFieldUpdateOperationsInput | number
  }

  export type RegionUncheckedUpdateWithoutHutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    boundingBoxMinLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMinLng?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLat?: FloatFieldUpdateOperationsInput | number
    boundingBoxMaxLng?: FloatFieldUpdateOperationsInput | number
    centerLat?: FloatFieldUpdateOperationsInput | number
    centerLng?: FloatFieldUpdateOperationsInput | number
  }

  export type RoomTypeConfigUpsertWithWhereUniqueWithoutHutInput = {
    where: RoomTypeConfigWhereUniqueInput
    update: XOR<RoomTypeConfigUpdateWithoutHutInput, RoomTypeConfigUncheckedUpdateWithoutHutInput>
    create: XOR<RoomTypeConfigCreateWithoutHutInput, RoomTypeConfigUncheckedCreateWithoutHutInput>
  }

  export type RoomTypeConfigUpdateWithWhereUniqueWithoutHutInput = {
    where: RoomTypeConfigWhereUniqueInput
    data: XOR<RoomTypeConfigUpdateWithoutHutInput, RoomTypeConfigUncheckedUpdateWithoutHutInput>
  }

  export type RoomTypeConfigUpdateManyWithWhereWithoutHutInput = {
    where: RoomTypeConfigScalarWhereInput
    data: XOR<RoomTypeConfigUpdateManyMutationInput, RoomTypeConfigUncheckedUpdateManyWithoutHutInput>
  }

  export type RoomTypeConfigScalarWhereInput = {
    AND?: RoomTypeConfigScalarWhereInput | RoomTypeConfigScalarWhereInput[]
    OR?: RoomTypeConfigScalarWhereInput[]
    NOT?: RoomTypeConfigScalarWhereInput | RoomTypeConfigScalarWhereInput[]
    id?: StringFilter<"RoomTypeConfig"> | string
    hutId?: StringFilter<"RoomTypeConfig"> | string
    type?: EnumRoomTypeFilter<"RoomTypeConfig"> | $Enums.RoomType
    count?: IntFilter<"RoomTypeConfig"> | number
  }

  export type RouteUpsertWithWhereUniqueWithoutFromHutInput = {
    where: RouteWhereUniqueInput
    update: XOR<RouteUpdateWithoutFromHutInput, RouteUncheckedUpdateWithoutFromHutInput>
    create: XOR<RouteCreateWithoutFromHutInput, RouteUncheckedCreateWithoutFromHutInput>
  }

  export type RouteUpdateWithWhereUniqueWithoutFromHutInput = {
    where: RouteWhereUniqueInput
    data: XOR<RouteUpdateWithoutFromHutInput, RouteUncheckedUpdateWithoutFromHutInput>
  }

  export type RouteUpdateManyWithWhereWithoutFromHutInput = {
    where: RouteScalarWhereInput
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyWithoutFromHutInput>
  }

  export type RouteScalarWhereInput = {
    AND?: RouteScalarWhereInput | RouteScalarWhereInput[]
    OR?: RouteScalarWhereInput[]
    NOT?: RouteScalarWhereInput | RouteScalarWhereInput[]
    id?: StringFilter<"Route"> | string
    fromHutId?: StringFilter<"Route"> | string
    toHutId?: StringFilter<"Route"> | string
    distance?: FloatFilter<"Route"> | number
    ascent?: IntFilter<"Route"> | number
    descent?: IntFilter<"Route"> | number
    estimatedDuration?: FloatFilter<"Route"> | number
    difficulty?: EnumDifficultyFilter<"Route"> | $Enums.Difficulty
    dataSource?: EnumDataSourceFilter<"Route"> | $Enums.DataSource
    gpxTrack?: JsonNullableFilter<"Route">
  }

  export type RouteUpsertWithWhereUniqueWithoutToHutInput = {
    where: RouteWhereUniqueInput
    update: XOR<RouteUpdateWithoutToHutInput, RouteUncheckedUpdateWithoutToHutInput>
    create: XOR<RouteCreateWithoutToHutInput, RouteUncheckedCreateWithoutToHutInput>
  }

  export type RouteUpdateWithWhereUniqueWithoutToHutInput = {
    where: RouteWhereUniqueInput
    data: XOR<RouteUpdateWithoutToHutInput, RouteUncheckedUpdateWithoutToHutInput>
  }

  export type RouteUpdateManyWithWhereWithoutToHutInput = {
    where: RouteScalarWhereInput
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyWithoutToHutInput>
  }

  export type AvailabilityCheckUpsertWithWhereUniqueWithoutHutInput = {
    where: AvailabilityCheckWhereUniqueInput
    update: XOR<AvailabilityCheckUpdateWithoutHutInput, AvailabilityCheckUncheckedUpdateWithoutHutInput>
    create: XOR<AvailabilityCheckCreateWithoutHutInput, AvailabilityCheckUncheckedCreateWithoutHutInput>
  }

  export type AvailabilityCheckUpdateWithWhereUniqueWithoutHutInput = {
    where: AvailabilityCheckWhereUniqueInput
    data: XOR<AvailabilityCheckUpdateWithoutHutInput, AvailabilityCheckUncheckedUpdateWithoutHutInput>
  }

  export type AvailabilityCheckUpdateManyWithWhereWithoutHutInput = {
    where: AvailabilityCheckScalarWhereInput
    data: XOR<AvailabilityCheckUpdateManyMutationInput, AvailabilityCheckUncheckedUpdateManyWithoutHutInput>
  }

  export type AvailabilityCheckScalarWhereInput = {
    AND?: AvailabilityCheckScalarWhereInput | AvailabilityCheckScalarWhereInput[]
    OR?: AvailabilityCheckScalarWhereInput[]
    NOT?: AvailabilityCheckScalarWhereInput | AvailabilityCheckScalarWhereInput[]
    id?: StringFilter<"AvailabilityCheck"> | string
    hutId?: StringFilter<"AvailabilityCheck"> | string
    date?: DateTimeFilter<"AvailabilityCheck"> | Date | string
    roomType?: EnumRoomTypeFilter<"AvailabilityCheck"> | $Enums.RoomType
    available?: IntFilter<"AvailabilityCheck"> | number
    checkedAt?: DateTimeFilter<"AvailabilityCheck"> | Date | string
    source?: EnumBookingSystemFilter<"AvailabilityCheck"> | $Enums.BookingSystem
  }

  export type TourHutUpsertWithWhereUniqueWithoutHutInput = {
    where: TourHutWhereUniqueInput
    update: XOR<TourHutUpdateWithoutHutInput, TourHutUncheckedUpdateWithoutHutInput>
    create: XOR<TourHutCreateWithoutHutInput, TourHutUncheckedCreateWithoutHutInput>
  }

  export type TourHutUpdateWithWhereUniqueWithoutHutInput = {
    where: TourHutWhereUniqueInput
    data: XOR<TourHutUpdateWithoutHutInput, TourHutUncheckedUpdateWithoutHutInput>
  }

  export type TourHutUpdateManyWithWhereWithoutHutInput = {
    where: TourHutScalarWhereInput
    data: XOR<TourHutUpdateManyMutationInput, TourHutUncheckedUpdateManyWithoutHutInput>
  }

  export type TourHutScalarWhereInput = {
    AND?: TourHutScalarWhereInput | TourHutScalarWhereInput[]
    OR?: TourHutScalarWhereInput[]
    NOT?: TourHutScalarWhereInput | TourHutScalarWhereInput[]
    id?: StringFilter<"TourHut"> | string
    tourId?: StringFilter<"TourHut"> | string
    hutId?: StringFilter<"TourHut"> | string
    dayNumber?: IntFilter<"TourHut"> | number
  }

  export type HutCreateWithoutRoomTypesInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    region: RegionCreateNestedOneWithoutHutsInput
    routesFrom?: RouteCreateNestedManyWithoutFromHutInput
    routesTo?: RouteCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckCreateNestedManyWithoutHutInput
    tourHuts?: TourHutCreateNestedManyWithoutHutInput
  }

  export type HutUncheckedCreateWithoutRoomTypesInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    regionId: string
    routesFrom?: RouteUncheckedCreateNestedManyWithoutFromHutInput
    routesTo?: RouteUncheckedCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckUncheckedCreateNestedManyWithoutHutInput
    tourHuts?: TourHutUncheckedCreateNestedManyWithoutHutInput
  }

  export type HutCreateOrConnectWithoutRoomTypesInput = {
    where: HutWhereUniqueInput
    create: XOR<HutCreateWithoutRoomTypesInput, HutUncheckedCreateWithoutRoomTypesInput>
  }

  export type HutUpsertWithoutRoomTypesInput = {
    update: XOR<HutUpdateWithoutRoomTypesInput, HutUncheckedUpdateWithoutRoomTypesInput>
    create: XOR<HutCreateWithoutRoomTypesInput, HutUncheckedCreateWithoutRoomTypesInput>
    where?: HutWhereInput
  }

  export type HutUpdateToOneWithWhereWithoutRoomTypesInput = {
    where?: HutWhereInput
    data: XOR<HutUpdateWithoutRoomTypesInput, HutUncheckedUpdateWithoutRoomTypesInput>
  }

  export type HutUpdateWithoutRoomTypesInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    region?: RegionUpdateOneRequiredWithoutHutsNestedInput
    routesFrom?: RouteUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateWithoutRoomTypesInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    regionId?: StringFieldUpdateOperationsInput | string
    routesFrom?: RouteUncheckedUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUncheckedUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUncheckedUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUncheckedUpdateManyWithoutHutNestedInput
  }

  export type HutCreateWithoutRoutesFromInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    region: RegionCreateNestedOneWithoutHutsInput
    roomTypes?: RoomTypeConfigCreateNestedManyWithoutHutInput
    routesTo?: RouteCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckCreateNestedManyWithoutHutInput
    tourHuts?: TourHutCreateNestedManyWithoutHutInput
  }

  export type HutUncheckedCreateWithoutRoutesFromInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    regionId: string
    roomTypes?: RoomTypeConfigUncheckedCreateNestedManyWithoutHutInput
    routesTo?: RouteUncheckedCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckUncheckedCreateNestedManyWithoutHutInput
    tourHuts?: TourHutUncheckedCreateNestedManyWithoutHutInput
  }

  export type HutCreateOrConnectWithoutRoutesFromInput = {
    where: HutWhereUniqueInput
    create: XOR<HutCreateWithoutRoutesFromInput, HutUncheckedCreateWithoutRoutesFromInput>
  }

  export type HutCreateWithoutRoutesToInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    region: RegionCreateNestedOneWithoutHutsInput
    roomTypes?: RoomTypeConfigCreateNestedManyWithoutHutInput
    routesFrom?: RouteCreateNestedManyWithoutFromHutInput
    availability?: AvailabilityCheckCreateNestedManyWithoutHutInput
    tourHuts?: TourHutCreateNestedManyWithoutHutInput
  }

  export type HutUncheckedCreateWithoutRoutesToInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    regionId: string
    roomTypes?: RoomTypeConfigUncheckedCreateNestedManyWithoutHutInput
    routesFrom?: RouteUncheckedCreateNestedManyWithoutFromHutInput
    availability?: AvailabilityCheckUncheckedCreateNestedManyWithoutHutInput
    tourHuts?: TourHutUncheckedCreateNestedManyWithoutHutInput
  }

  export type HutCreateOrConnectWithoutRoutesToInput = {
    where: HutWhereUniqueInput
    create: XOR<HutCreateWithoutRoutesToInput, HutUncheckedCreateWithoutRoutesToInput>
  }

  export type HutUpsertWithoutRoutesFromInput = {
    update: XOR<HutUpdateWithoutRoutesFromInput, HutUncheckedUpdateWithoutRoutesFromInput>
    create: XOR<HutCreateWithoutRoutesFromInput, HutUncheckedCreateWithoutRoutesFromInput>
    where?: HutWhereInput
  }

  export type HutUpdateToOneWithWhereWithoutRoutesFromInput = {
    where?: HutWhereInput
    data: XOR<HutUpdateWithoutRoutesFromInput, HutUncheckedUpdateWithoutRoutesFromInput>
  }

  export type HutUpdateWithoutRoutesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    region?: RegionUpdateOneRequiredWithoutHutsNestedInput
    roomTypes?: RoomTypeConfigUpdateManyWithoutHutNestedInput
    routesTo?: RouteUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateWithoutRoutesFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    regionId?: StringFieldUpdateOperationsInput | string
    roomTypes?: RoomTypeConfigUncheckedUpdateManyWithoutHutNestedInput
    routesTo?: RouteUncheckedUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUncheckedUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUncheckedUpdateManyWithoutHutNestedInput
  }

  export type HutUpsertWithoutRoutesToInput = {
    update: XOR<HutUpdateWithoutRoutesToInput, HutUncheckedUpdateWithoutRoutesToInput>
    create: XOR<HutCreateWithoutRoutesToInput, HutUncheckedCreateWithoutRoutesToInput>
    where?: HutWhereInput
  }

  export type HutUpdateToOneWithWhereWithoutRoutesToInput = {
    where?: HutWhereInput
    data: XOR<HutUpdateWithoutRoutesToInput, HutUncheckedUpdateWithoutRoutesToInput>
  }

  export type HutUpdateWithoutRoutesToInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    region?: RegionUpdateOneRequiredWithoutHutsNestedInput
    roomTypes?: RoomTypeConfigUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUpdateManyWithoutFromHutNestedInput
    availability?: AvailabilityCheckUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateWithoutRoutesToInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    regionId?: StringFieldUpdateOperationsInput | string
    roomTypes?: RoomTypeConfigUncheckedUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUncheckedUpdateManyWithoutFromHutNestedInput
    availability?: AvailabilityCheckUncheckedUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUncheckedUpdateManyWithoutHutNestedInput
  }

  export type TourHutCreateWithoutTourInput = {
    id?: string
    dayNumber: number
    hut: HutCreateNestedOneWithoutTourHutsInput
  }

  export type TourHutUncheckedCreateWithoutTourInput = {
    id?: string
    hutId: string
    dayNumber: number
  }

  export type TourHutCreateOrConnectWithoutTourInput = {
    where: TourHutWhereUniqueInput
    create: XOR<TourHutCreateWithoutTourInput, TourHutUncheckedCreateWithoutTourInput>
  }

  export type TourHutCreateManyTourInputEnvelope = {
    data: TourHutCreateManyTourInput | TourHutCreateManyTourInput[]
    skipDuplicates?: boolean
  }

  export type TourHutUpsertWithWhereUniqueWithoutTourInput = {
    where: TourHutWhereUniqueInput
    update: XOR<TourHutUpdateWithoutTourInput, TourHutUncheckedUpdateWithoutTourInput>
    create: XOR<TourHutCreateWithoutTourInput, TourHutUncheckedCreateWithoutTourInput>
  }

  export type TourHutUpdateWithWhereUniqueWithoutTourInput = {
    where: TourHutWhereUniqueInput
    data: XOR<TourHutUpdateWithoutTourInput, TourHutUncheckedUpdateWithoutTourInput>
  }

  export type TourHutUpdateManyWithWhereWithoutTourInput = {
    where: TourHutScalarWhereInput
    data: XOR<TourHutUpdateManyMutationInput, TourHutUncheckedUpdateManyWithoutTourInput>
  }

  export type TourCreateWithoutHutsInput = {
    id?: string
    name?: string | null
    groupSize: number
    totalDays: number
    restDays?: number
    accommodationType?: $Enums.AccommodationType
    maxBedsPerRoom?: number | null
    minDistancePerDay?: number | null
    maxDistancePerDay?: number | null
    maxAscentPerDay?: number | null
    dateRangeStart?: Date | string | null
    dateRangeEnd?: Date | string | null
    status?: $Enums.TourStatus
    createdAt?: Date | string
  }

  export type TourUncheckedCreateWithoutHutsInput = {
    id?: string
    name?: string | null
    groupSize: number
    totalDays: number
    restDays?: number
    accommodationType?: $Enums.AccommodationType
    maxBedsPerRoom?: number | null
    minDistancePerDay?: number | null
    maxDistancePerDay?: number | null
    maxAscentPerDay?: number | null
    dateRangeStart?: Date | string | null
    dateRangeEnd?: Date | string | null
    status?: $Enums.TourStatus
    createdAt?: Date | string
  }

  export type TourCreateOrConnectWithoutHutsInput = {
    where: TourWhereUniqueInput
    create: XOR<TourCreateWithoutHutsInput, TourUncheckedCreateWithoutHutsInput>
  }

  export type HutCreateWithoutTourHutsInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    region: RegionCreateNestedOneWithoutHutsInput
    roomTypes?: RoomTypeConfigCreateNestedManyWithoutHutInput
    routesFrom?: RouteCreateNestedManyWithoutFromHutInput
    routesTo?: RouteCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckCreateNestedManyWithoutHutInput
  }

  export type HutUncheckedCreateWithoutTourHutsInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    regionId: string
    roomTypes?: RoomTypeConfigUncheckedCreateNestedManyWithoutHutInput
    routesFrom?: RouteUncheckedCreateNestedManyWithoutFromHutInput
    routesTo?: RouteUncheckedCreateNestedManyWithoutToHutInput
    availability?: AvailabilityCheckUncheckedCreateNestedManyWithoutHutInput
  }

  export type HutCreateOrConnectWithoutTourHutsInput = {
    where: HutWhereUniqueInput
    create: XOR<HutCreateWithoutTourHutsInput, HutUncheckedCreateWithoutTourHutsInput>
  }

  export type TourUpsertWithoutHutsInput = {
    update: XOR<TourUpdateWithoutHutsInput, TourUncheckedUpdateWithoutHutsInput>
    create: XOR<TourCreateWithoutHutsInput, TourUncheckedCreateWithoutHutsInput>
    where?: TourWhereInput
  }

  export type TourUpdateToOneWithWhereWithoutHutsInput = {
    where?: TourWhereInput
    data: XOR<TourUpdateWithoutHutsInput, TourUncheckedUpdateWithoutHutsInput>
  }

  export type TourUpdateWithoutHutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groupSize?: IntFieldUpdateOperationsInput | number
    totalDays?: IntFieldUpdateOperationsInput | number
    restDays?: IntFieldUpdateOperationsInput | number
    accommodationType?: EnumAccommodationTypeFieldUpdateOperationsInput | $Enums.AccommodationType
    maxBedsPerRoom?: NullableIntFieldUpdateOperationsInput | number | null
    minDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAscentPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    dateRangeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateRangeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTourStatusFieldUpdateOperationsInput | $Enums.TourStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourUncheckedUpdateWithoutHutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groupSize?: IntFieldUpdateOperationsInput | number
    totalDays?: IntFieldUpdateOperationsInput | number
    restDays?: IntFieldUpdateOperationsInput | number
    accommodationType?: EnumAccommodationTypeFieldUpdateOperationsInput | $Enums.AccommodationType
    maxBedsPerRoom?: NullableIntFieldUpdateOperationsInput | number | null
    minDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDistancePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAscentPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    dateRangeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateRangeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTourStatusFieldUpdateOperationsInput | $Enums.TourStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HutUpsertWithoutTourHutsInput = {
    update: XOR<HutUpdateWithoutTourHutsInput, HutUncheckedUpdateWithoutTourHutsInput>
    create: XOR<HutCreateWithoutTourHutsInput, HutUncheckedCreateWithoutTourHutsInput>
    where?: HutWhereInput
  }

  export type HutUpdateToOneWithWhereWithoutTourHutsInput = {
    where?: HutWhereInput
    data: XOR<HutUpdateWithoutTourHutsInput, HutUncheckedUpdateWithoutTourHutsInput>
  }

  export type HutUpdateWithoutTourHutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    region?: RegionUpdateOneRequiredWithoutHutsNestedInput
    roomTypes?: RoomTypeConfigUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateWithoutTourHutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    regionId?: StringFieldUpdateOperationsInput | string
    roomTypes?: RoomTypeConfigUncheckedUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUncheckedUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUncheckedUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUncheckedUpdateManyWithoutHutNestedInput
  }

  export type HutCreateWithoutAvailabilityInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    region: RegionCreateNestedOneWithoutHutsInput
    roomTypes?: RoomTypeConfigCreateNestedManyWithoutHutInput
    routesFrom?: RouteCreateNestedManyWithoutFromHutInput
    routesTo?: RouteCreateNestedManyWithoutToHutInput
    tourHuts?: TourHutCreateNestedManyWithoutHutInput
  }

  export type HutUncheckedCreateWithoutAvailabilityInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
    regionId: string
    roomTypes?: RoomTypeConfigUncheckedCreateNestedManyWithoutHutInput
    routesFrom?: RouteUncheckedCreateNestedManyWithoutFromHutInput
    routesTo?: RouteUncheckedCreateNestedManyWithoutToHutInput
    tourHuts?: TourHutUncheckedCreateNestedManyWithoutHutInput
  }

  export type HutCreateOrConnectWithoutAvailabilityInput = {
    where: HutWhereUniqueInput
    create: XOR<HutCreateWithoutAvailabilityInput, HutUncheckedCreateWithoutAvailabilityInput>
  }

  export type HutUpsertWithoutAvailabilityInput = {
    update: XOR<HutUpdateWithoutAvailabilityInput, HutUncheckedUpdateWithoutAvailabilityInput>
    create: XOR<HutCreateWithoutAvailabilityInput, HutUncheckedCreateWithoutAvailabilityInput>
    where?: HutWhereInput
  }

  export type HutUpdateToOneWithWhereWithoutAvailabilityInput = {
    where?: HutWhereInput
    data: XOR<HutUpdateWithoutAvailabilityInput, HutUncheckedUpdateWithoutAvailabilityInput>
  }

  export type HutUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    region?: RegionUpdateOneRequiredWithoutHutsNestedInput
    roomTypes?: RoomTypeConfigUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUpdateManyWithoutToHutNestedInput
    tourHuts?: TourHutUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    regionId?: StringFieldUpdateOperationsInput | string
    roomTypes?: RoomTypeConfigUncheckedUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUncheckedUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUncheckedUpdateManyWithoutToHutNestedInput
    tourHuts?: TourHutUncheckedUpdateManyWithoutHutNestedInput
  }

  export type HutCreateManyRegionInput = {
    id?: string
    osmId?: bigint | number | null
    name: string
    altitude: number
    lat: number
    lng: number
    capacity: number
    operator?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: string | null
    bookingUrl?: string | null
    bookingSystem?: $Enums.BookingSystem
    imageUrl?: string | null
    description?: string | null
    amenities?: HutCreateamenitiesInput | string[]
    dataSource?: $Enums.DataSource
  }

  export type HutUpdateWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    roomTypes?: RoomTypeConfigUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    roomTypes?: RoomTypeConfigUncheckedUpdateManyWithoutHutNestedInput
    routesFrom?: RouteUncheckedUpdateManyWithoutFromHutNestedInput
    routesTo?: RouteUncheckedUpdateManyWithoutToHutNestedInput
    availability?: AvailabilityCheckUncheckedUpdateManyWithoutHutNestedInput
    tourHuts?: TourHutUncheckedUpdateManyWithoutHutNestedInput
  }

  export type HutUncheckedUpdateManyWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    osmId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    altitude?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    operator?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingSystem?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: HutUpdateamenitiesInput | string[]
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
  }

  export type RoomTypeConfigCreateManyHutInput = {
    id?: string
    type: $Enums.RoomType
    count: number
  }

  export type RouteCreateManyFromHutInput = {
    id?: string
    toHutId: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteCreateManyToHutInput = {
    id?: string
    fromHutId: string
    distance: number
    ascent: number
    descent: number
    estimatedDuration: number
    difficulty: $Enums.Difficulty
    dataSource?: $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AvailabilityCheckCreateManyHutInput = {
    id?: string
    date: Date | string
    roomType: $Enums.RoomType
    available: number
    checkedAt?: Date | string
    source: $Enums.BookingSystem
  }

  export type TourHutCreateManyHutInput = {
    id?: string
    tourId: string
    dayNumber: number
  }

  export type RoomTypeConfigUpdateWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    count?: IntFieldUpdateOperationsInput | number
  }

  export type RoomTypeConfigUncheckedUpdateWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    count?: IntFieldUpdateOperationsInput | number
  }

  export type RoomTypeConfigUncheckedUpdateManyWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    count?: IntFieldUpdateOperationsInput | number
  }

  export type RouteUpdateWithoutFromHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
    toHut?: HutUpdateOneRequiredWithoutRoutesToNestedInput
  }

  export type RouteUncheckedUpdateWithoutFromHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    toHutId?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteUncheckedUpdateManyWithoutFromHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    toHutId?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteUpdateWithoutToHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
    fromHut?: HutUpdateOneRequiredWithoutRoutesFromNestedInput
  }

  export type RouteUncheckedUpdateWithoutToHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromHutId?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RouteUncheckedUpdateManyWithoutToHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromHutId?: StringFieldUpdateOperationsInput | string
    distance?: FloatFieldUpdateOperationsInput | number
    ascent?: IntFieldUpdateOperationsInput | number
    descent?: IntFieldUpdateOperationsInput | number
    estimatedDuration?: FloatFieldUpdateOperationsInput | number
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    gpxTrack?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AvailabilityCheckUpdateWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    available?: IntFieldUpdateOperationsInput | number
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
  }

  export type AvailabilityCheckUncheckedUpdateWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    available?: IntFieldUpdateOperationsInput | number
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
  }

  export type AvailabilityCheckUncheckedUpdateManyWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    available?: IntFieldUpdateOperationsInput | number
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: EnumBookingSystemFieldUpdateOperationsInput | $Enums.BookingSystem
  }

  export type TourHutUpdateWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    tour?: TourUpdateOneRequiredWithoutHutsNestedInput
  }

  export type TourHutUncheckedUpdateWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourId?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type TourHutUncheckedUpdateManyWithoutHutInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourId?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type TourHutCreateManyTourInput = {
    id?: string
    hutId: string
    dayNumber: number
  }

  export type TourHutUpdateWithoutTourInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
    hut?: HutUpdateOneRequiredWithoutTourHutsNestedInput
  }

  export type TourHutUncheckedUpdateWithoutTourInput = {
    id?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }

  export type TourHutUncheckedUpdateManyWithoutTourInput = {
    id?: StringFieldUpdateOperationsInput | string
    hutId?: StringFieldUpdateOperationsInput | string
    dayNumber?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}