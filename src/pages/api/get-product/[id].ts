import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (req.method === 'GET' && typeof id === 'string' && id.trim().length > 0) {
    try {
      const docRef = doc(db, 'products', id.trim())
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const product = { id: docSnap.id, ...docSnap.data() }
        res.status(200).json(product)
      } else {
        res.status(404).json({ message: 'Product not found' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(400).json({ message: 'Bad request' })
  }
}
