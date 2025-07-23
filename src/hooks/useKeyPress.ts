import { useEffect, useRef } from "react"

const useKey = (key: string, cb: Function) => {

    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    })

    useEffect(() => {

        const handleKey = (e: KeyboardEvent) => {
            if (e.code === key) {
                callbackRef.current(e)
            }
        }

        document.addEventListener('keydown', (e) => handleKey(e))
        return () => document.removeEventListener('keydown', handleKey)
    }, [key])

}

export default useKey