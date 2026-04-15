
import axios from 'axios';
import { codeToHtml } from "shiki";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const response = await axios.get(`http://localhost:3002/api/snippets/${slug}`);
    const snippet = response.data.data;

    const codeSnipped = await codeToHtml(snippet.content, {
        lang: snippet.language,
        theme: "github-dark"
    });

  return (
    <div className='px-4 py-4'>
        <div className="[&_pre]:whitespace-pre-wrap [&_pre]:break-all" dangerouslySetInnerHTML={{ __html: codeSnipped}} />
    </div>
  )
}

export default page