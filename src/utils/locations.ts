import useBrowserMode from "../shared/hooks/useBrowserMode"

export const changeRef = (redireccion: string) => {
    const { window } = useBrowserMode()
    let hostname = "/"
    try {
        hostname = window?.location?.hostname === "localhost" ? "/" : "/ayuda/"
    } catch (error) {
        console.error(error)
    }
    redireccion = redireccion ?? "/"
    if (
        redireccion?.includes("https") ||
        redireccion?.includes("http") ||
        redireccion?.includes("www")
    ) {
        return redireccion
    } else {
        const paths = redireccion?.split("/")
        if (paths && (paths[0].includes("ayuda") || paths[0] === "")) {
            paths.shift()
        }
        console.log("changeRef", redireccion, paths)
        return paths ? `${hostname}${paths.join("/")}` : "/"
    }
}