import { Dictionary } from '@/get-dictionary'

export type Material = {
  materialCode?: string
  storageLocation?: string
  batchNumber?: string
  stockQuantity2?: number
  stockUnit2?: string
  materialType?: string
  description?: string
  dimension1?: number
  dimension2?: number
  dimension3?: number
}

export const materials: Material[] = [
  {
    materialCode: 'M001',
    storageLocation: 'SL001',
    batchNumber: 'B001',
    stockQuantity2: 200,
    stockUnit2: 'lb',
    materialType: 'Type1',
    description: 'Material 1 Description',
    dimension1: 10,
    dimension2: 20,
    dimension3: 30,
  },
  {
    materialCode: 'M002',
    storageLocation: 'SL002',
    batchNumber: 'B002',
    stockQuantity2: 150,
    stockUnit2: 'kg',
    materialType: 'Type2',
    description: 'Material 2 Description',
    dimension1: 15,
    dimension2: 25,
    dimension3: 35,
  },
  {
    materialCode: 'M003',
    storageLocation: 'SL003',
    batchNumber: 'B003',
    stockQuantity2: 300,
    stockUnit2: 'g',
    materialType: 'Type3',
    description: 'Material 3 Description',
    dimension1: 20,
    dimension2: 30,
    dimension3: 40,
  },
  {
    materialCode: 'M004',
    storageLocation: 'SL004',
    batchNumber: 'B004',
    stockQuantity2: 250,
    stockUnit2: 'lb',
    materialType: 'Type4',
    description: 'Material 4 Description',
    dimension1: 25,
    dimension2: 35,
    dimension3: 45,
  },
  {
    materialCode: 'M005',
    storageLocation: 'SL005',
    batchNumber: 'B005',
    stockQuantity2: 100,
    stockUnit2: 'kg',
    materialType: 'Type5',
    description: 'Material 5 Description',
    dimension1: 30,
    dimension2: 40,
    dimension3: 50,
  },
  {
    materialCode: 'M006',
    storageLocation: 'SL006',
    batchNumber: 'B006',
    stockQuantity2: 400,
    stockUnit2: 'g',
    materialType: 'Type6',
    description: 'Material 6 Description',
    dimension1: 35,
    dimension2: 45,
    dimension3: 55,
  },
]

const columns: {
  title: string
  uid: keyof Material
  sortable: boolean
}[] = [
  { title: 'Material Code', uid: 'materialCode', sortable: false },
  { title: 'Storage Location', uid: 'storageLocation', sortable: false },
  { title: 'Batch Number', uid: 'batchNumber', sortable: false },
  { title: 'Stock Quantity', uid: 'stockQuantity2', sortable: false },
  { title: 'Stock Unit', uid: 'stockUnit2', sortable: false },
  { title: 'Material Type', uid: 'materialType', sortable: false },
  { title: 'Description', uid: 'description', sortable: false },
  { title: 'Dimension 1', uid: 'dimension1', sortable: false },
  { title: 'Dimension 2', uid: 'dimension2', sortable: false },
  { title: 'Dimension 3', uid: 'dimension3', sortable: false },
]

export const getColumns: (
  t: Dictionary['home']['tableColumns']
) => typeof columns = (t) => {
  return columns.map((column) => ({
    ...column,
    title: t[column.uid],
  }))
}

export const INITIAL_VISIBLE_COLUMNS: (keyof Material)[] = [
  'materialCode',
  'storageLocation',
  'batchNumber',
  'stockQuantity2',
  'stockUnit2',
  'materialType',
  'description',
  'dimension1',
  'dimension2',
  'dimension3',
]
