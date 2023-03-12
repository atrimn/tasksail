import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import BlogPost from '../components/blogPost'
import fs from 'fs'

const inter = Inter({ subsets: ['latin'] })

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const post = [
  {
    title: 'atrims first blog post',
    time: new Date().toLocaleDateString('en-GB', options),
    body: 'The Rise of Remote Work: Stats and Strategies for Thriving in the New Normal" - According to a recent report by Upwork, over 40% of the American workforce is now working remotely. This post could explore the benefits and challenges of remote work, share strategies for staying productive and connected, and provide data on the current state of the remote work landscape.',
  },
  {
    title: 'atrims first blog post',
    time: new Date().toLocaleDateString('en-GB', options),
    body: 'The Rise of Remote Work: Stats and Strategies for Thriving in the New Normal" - According to a recent report by Upwork, over 40% of the American workforce is now working remotely. This post could explore the benefits and challenges of remote work, share strategies for staying productive and connected, and provide data on the current state of the remote work landscape.',
  },
  {
    title: 'atrims first blog post',
    time: new Date().toLocaleDateString('en-GB', options),
    body: 'The Rise of Remote Work: Stats and Strategies for Thriving in the New Normal" - According to a recent report by Upwork, over 40% of the American workforce is now working remotely. This post could explore the benefits and challenges of remote work, share strategies for staying productive and connected, and provide data on the current state of the remote work landscape.',
  },
  {
    title: 'atrims first blog post',
    time: new Date().toLocaleDateString('en-GB', options),
    body: 'The Rise of Remote Work: Stats and Strategies for Thriving in the New Normal" - According to a recent report by Upwork, over 40% of the American workforce is now working remotely. This post could explore the benefits and challenges of remote work, share strategies for staying productive and connected, and provide data on the current state of the remote work landscape.',
  },
  {
    title: 'atrims first blog post',
    time: new Date().toLocaleDateString('en-GB', options),
    body: 'The Rise of Remote Work: Stats and Strategies for Thriving in the New Normal" - According to a recent report by Upwork, over 40% of the American workforce is now working remotely. This post could explore the benefits and challenges of remote work, share strategies for staying productive and connected, and provide data on the current state of the remote work landscape.',
  },
]

const extractMetadataFromMarkdown = (markdown) => {
  const charactersBetweenGroupedHyphens = /^---([\s\S]*?)---/
  const metadataMatched = markdown.match(charactersBetweenGroupedHyphens)
  const metadata = metadataMatched[1]

  if (!metadata) {
    return {}
  }

  const metadataLines = metadata.split('\n')
  const metadataObject = metadataLines.reduce((accumulator, line) => {
    const [key, ...value] = line
      .split(':')
      .map((part) => part.trim().replace(/['"]+/g, ''))

    if (key) accumulator[key] = value[1] ? value.join(':') : value.join('')
    return accumulator
  }, {})

  return metadataObject
}

const getPostMetaData = () => {
  const folder = 'posts/'
  const files = fs.readdirSync(folder)
  const markdownFiles = files.filter((fn) => fn.endsWith('.md'))
  const slugs = markdownFiles.map((fn) => fn.replace('.md', ''))
  return slugs
}

const getPostContent = (slug) => {
  const folder = 'posts/'
  const file = `${folder}${slug}.md`
  const content = fs.readFileSync(file, 'utf8')
  const metaData = extractMetadataFromMarkdown(content)
  console.log(metaData)
  return metaData
}

const blogPosts = (slug) => {
  const content = getPostContent(slug)
  console.log(content)
  return (
    <BlogPost
      title={content.title}
      time={content.date}
      body={content.subtitle}
    />
  )
}

export default function Home() {
  const postMetaData = getPostMetaData()
  return (
    <>
      <div className='fixed inset-0 flex justify-center sm:px}-8'>
        <div className='flex w-full max-w-7xl lg:px-8'>
          <div className='w-full ring-1 ring-zinc-300/20'></div>
        </div>
      </div>
      <div className='relative'>
        <div style={{ height: '116px', width: '100%' }}></div>
        <main>
          <div className='sm:px-8 mt-9'>
            <div className='mx-auto max-w-7xl lg:px-8'>
              <div className='relative px-4 sm:px-8 lg:px-12'>
                <div className='mx-auto max-w-2xl lg:max-w-5xl'>
                  <div className='max-w-2xl'>
                    <h1 className='text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl'>
                      Tasksail: Share Your Voice with the World
                    </h1>
                    <p className='mt-6 text-base text-zinc-400'>
                      Join Tasksail today and start sharing your ideas and
                      expertise with the world. Whether you're a seasoned
                      blogger or just starting out, our platform provides the
                      perfect space for you to showcase your talents and connect
                      with like-minded individuals. Don't miss out on the
                      opportunity to inspire, educate, and engage readers
                      through your writing. Sign up now and take the first step
                      towards becoming a part of our vibrant community!
                    </p>
                  </div>
                  <div className='relative my-8'>
                    <div
                      className='absolute inset-0 flex items-center'
                      aria-hidden='true'
                    >
                      <div className='w-full border-t border-gray-300' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Blog post */}
          <div className='sm:px-8 mt-24 md:mt-28'>
            <div className='mx-auto max-w-7xl lg:px-8'>
              <div className='relative px-4 sm:px-8 lg:px-12'>
                <div className='mx-auto max-w-2xl lg:max-w-5xl'>
                  <div className='mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2'>
                    <div className='flex flex-col gap-16'>
                      {postMetaData.map((slug, i) => {
                        return blogPosts(slug)
                      })}
                    </div>
                    <div className='space-y-10 lg:pl-16 xl:pl-24'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
