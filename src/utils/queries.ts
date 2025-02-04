import { TranslatorType } from '@/db'

export const getTranslators = async (
  url: string
): Promise<TranslatorType[]> => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      return []
    })
}

export const updateTranslator = async (
  url: string,
  updatedTranslator: TranslatorType
): Promise<TranslatorType | null> => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTranslator),
    })

    if (!response.ok) {
      // Handle non-2xx responses (e.g., 400, 404, 500)
      const errorData = await response.json()
      console.error('Error updating translator:', errorData.error)
      return null
    }

    const updatedData = await response.json()
    return updatedData
  } catch (err) {
    console.error('Error:', err)
    return null
  }
}
