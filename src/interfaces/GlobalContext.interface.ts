export interface GlobalContextState {
    fontSize: {
        get: number;
        set: (size: number) => void
    },
    selectedTab: {
        get: Tabs,
        set: (valueTab: Tabs) => void
    }
}

export type Tabs =
    | "personas"
    | "empresas";