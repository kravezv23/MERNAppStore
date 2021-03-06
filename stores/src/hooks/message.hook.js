import {useCallback} from 'react'

export  const useMessage = () => {
    return useCallback(text => {
        if (window.M.toast && text){
            window.M.toast({ html: text, classes: 'z-depth-4'})
        }
    }, [])
}