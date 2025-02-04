import { NextResponse } from 'next/server'
import { db } from '@/db'
import { models } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const allModels = db.select().from(models).all()
    return NextResponse.json(allModels)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, modelName, modelUrl, label } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const existingModel = db
      .select()
      .from(models)
      .where(eq(models.id, id))
      .get()

    if (!existingModel) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    // Check for unique constraints
    if (modelUrl) {
      const urlExists = db
        .select()
        .from(models)
        .where(eq(models.modelUrl, modelUrl))
        .get()

      if (urlExists && urlExists.id !== id) {
        return NextResponse.json(
          { error: 'Model URL must be unique' },
          { status: 400 }
        )
      }
    }

    if (label) {
      const labelExists = db
        .select()
        .from(models)
        .where(eq(models.label, label))
        .get()

      if (labelExists && labelExists.id !== id) {
        return NextResponse.json(
          { error: 'Label must be unique' },
          { status: 400 }
        )
      }
    }

    const updateData: {
      modelName?: string
      modelUrl?: string
      label?: string
    } = {}
    if (modelName !== undefined) updateData.modelName = modelName
    if (modelUrl !== undefined) updateData.modelUrl = modelUrl
    if (label !== undefined) updateData.label = label

    db.update(models).set(updateData).where(eq(models.id, id)).run()

    const updatedModel = db.select().from(models).where(eq(models.id, id)).get()

    return NextResponse.json(updatedModel)
  } catch {
    return NextResponse.json(
      { error: 'Failed to update model' },
      { status: 500 }
    )
  }
}
