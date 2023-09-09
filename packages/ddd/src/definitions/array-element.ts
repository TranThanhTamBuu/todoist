import { Type } from "@nestjs/common";

export type ArrayElement<ArrayType> = ArrayType extends Array<infer ElementType> ? ElementType : never;

export type InstanceOfClasses<T extends Array<Type<any>>> = InstanceType<ArrayElement<T>>;
