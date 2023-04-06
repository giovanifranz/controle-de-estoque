import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (
    req.method === 'DELETE' &&
    typeof id === 'string' &&
    id.trim().length > 0
  ) {
    try {
      const docRef = doc(db, 'products', id)
      await deleteDoc(docRef)
      res.status(204).end()
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(400).json({ message: 'Bad request' })
  }
}
