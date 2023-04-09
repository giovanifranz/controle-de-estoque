import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

type Product = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body as Product
      const productsRef = collection(db, 'products')
      const docRef = doc(productsRef)
      await setDoc(docRef, { name })
      const docSnap = await getDoc(docRef)
      const product = { id: docSnap.id, ...docSnap.data() }
      res.status(201).json(product)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(400).json({ message: 'Bad request' })
  }
}
