import Container from '@/components/Container'
import { NotionRenderer, Equation, Code, Collection, CollectionRow } from 'react-notion-x'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import { useLocale } from '@/lib/locale'
import { useRouter } from 'next/router'
import Comments from '@/components/Comments'

const mapPageUrl = id => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

const Layout = ({
  children,
  blockMap,
  frontMatter,
  emailHash,
  fullWidth = false
}) => {
  const locale = useLocale()
  const router = useRouter()
  return (
    <Container
      layout="blog"
      title={frontMatter.title}
      description={frontMatter.summary}
      type="article"
      fullWidth={fullWidth}
    >
      <article>
        <h1 className="font-bold text-3xl text-black dark:text-white">
          {frontMatter.title}
        </h1>
        {frontMatter.type[0] !== 'Page' && (
          <nav className="flex mt-7 items-start text-gray-400 dark:text-gray-300">
            <div className="flex mb-4">
              <a href={BLOG.socialLink || '#'} className="flex">
                <p className="md:block">{BLOG.author}</p>
              </a>
              <span className="block">&nbsp; &nbsp; / &nbsp; &nbsp;</span>
            </div>
            <div className="mr-2 mb-4 md:ml-0">
              {formatDate(
                frontMatter?.date?.start_date || frontMatter.createdTime,
                BLOG.lang
              )}
            </div>
          </nav>
        )}
        {children}
        {blockMap && (
          <div className="-mt-4">
            <NotionRenderer
              recordMap={blockMap}
              components={{
                equation: Equation,
                code: Code,
                collection: Collection,
                collectionRow: CollectionRow
              }}
              mapPageUrl={mapPageUrl}
            />
          </div>
        )}
      </article>
      <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
        <a>
          <button
            onClick={() => router.push(BLOG.path || '/')}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ← {locale.POST.BACK}
          </button>
        </a>
        <a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ↑ {locale.POST.TOP}
          </button>
        </a>
      </div>
      <Comments frontMatter={frontMatter} />
    </Container>
  )
}

export default Layout

// unused tags code for search functionality
//
// {/*{frontMatter.tags && (*/}
// {/*  <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">*/}
// {/*    {frontMatter.tags.map(tag => (*/}
// {/*      <TagItem key={tag} tag={tag} />*/}
// {/*    ))}*/}
// {/*  </div>*/}
// {/*)}*/}
