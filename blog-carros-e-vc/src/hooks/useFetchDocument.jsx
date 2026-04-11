import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"


export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const isCancelled = useRef(false)

    useEffect(() => {
        isCancelled.current = false

        const loadDocument = async () => {

            setLoading(true)
            setError(null)

            try {
                const docRef = doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                if (isCancelled.current) return

                setDocument(docSnap.data())
            } catch (error) {
                if (isCancelled.current) return

                console.log(error)
                setError(error.message)
            } finally {
                if (!isCancelled.current) {
                    setLoading(false)
                }
            }
        }

        loadDocument()

        return () => {
            isCancelled.current = true
        }
        
    }, [docCollection, id])

    return { document, loading, error }
}
