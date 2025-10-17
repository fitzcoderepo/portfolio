
import Form from 'next/form'
 
export default function Search() {
  return (
    <Form action="/search" className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
      {/* value will be appended to, e.g. /search?query=abc */}
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  )
}