export declare const resolveAppFunction: (appFnId: string, opts?: ResolveOptions) => Promise<any>;
export type Resolver = (appFnId: string, opts: {
    basedir: string;
}) => string;
export interface ResolveOptions {
    basedir?: string;
    resolver?: Resolver;
}
