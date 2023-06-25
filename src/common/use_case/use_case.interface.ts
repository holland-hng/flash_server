export interface UseCase<ParamType, ResultType> {
  execute(
    data: ParamType | null,
  ): ResultType | void | Promise<ResultType | void>;
}
