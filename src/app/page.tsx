interface HomeProps {
  params: Promise<unknown>
}

export default async function HomePage({ params }: HomeProps) {
  await params
  return <></>
}
