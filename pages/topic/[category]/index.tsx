/** @format */

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-fetch'

import Layout from '../../../components/Layout'
import CardList from '../../../components/CardList'
import { TCategory } from '../../../typing'

interface CategoryProps {
    data: {
        categories: TCategory[]
    }
}

const s = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor. Nunc sed velit dignissim sodales ut eu sem integer. Vitae nunc sed velit dignissim sodales. Arcu dictum varius duis at consectetur lorem donec. Quis varius quam quisque id. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Morbi quis commodo odio aenean sed adipiscing diam donec. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Diam quis enim lobortis scelerisque fermentum. Diam maecenas sed enim ut sem viverra aliquet eget sit. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Tortor vitae purus faucibus ornare suspendisse. Consequat interdum varius sit amet mattis vulputate. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Id velit ut tortor pretium viverra suspendisse potenti. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Velit euismod in pellentesque massa placerat duis. Sit amet commodo nulla facilisi nullam vehicula ipsum a.

Tincidunt id aliquet risus feugiat in ante metus. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Semper quis lectus nulla at volutpat diam ut venenatis tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. Mollis nunc sed id semper. Tincidunt praesent semper feugiat nibh. Sapien eget mi proin sed libero enim sed faucibus turpis. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Amet porttitor eget dolor morbi non arcu risus quis. Leo urna molestie at elementum eu facilisis sed odio. Sed nisi lacus sed viverra tellus. Ornare aenean euismod elementum nisi quis eleifend. Sit amet porttitor eget dolor morbi. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Pellentesque diam volutpat commodo sed. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut.

Turpis nunc eget lorem dolor sed viverra. Eget dolor morbi non arcu risus quis varius. Tortor condimentum lacinia quis vel eros donec. Pharetra convallis posuere morbi leo. Turpis egestas pretium aenean pharetra magna ac. Lobortis elementum nibh tellus molestie nunc. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Sodales ut eu sem integer vitae justo eget magna. Integer malesuada nunc vel risus commodo. Lacus luctus accumsan tortor posuere ac ut consequat semper. Diam maecenas ultricies mi eget mauris. Ut consequat semper viverra nam libero justo laoreet sit. Dolor purus non enim praesent. A lacus vestibulum sed arcu non odio euismod lacinia. Porta non pulvinar neque laoreet. Augue eget arcu dictum varius duis. Enim eu turpis egestas pretium. Scelerisque eu ultrices vitae auctor eu augue. Vulputate enim nulla aliquet porttitor lacus luctus accumsan.

Justo donec enim diam vulputate. Et malesuada fames ac turpis egestas maecenas pharetra. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Feugiat nibh sed pulvinar proin gravida. Morbi tristique senectus et netus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Vel fringilla est ullamcorper eget. Id faucibus nisl tincidunt eget nullam. Orci a scelerisque purus semper eget. Vehicula ipsum a arcu cursus vitae congue mauris. Nunc lobortis mattis aliquam faucibus purus in. Eleifend mi in nulla posuere sollicitudin. Ipsum nunc aliquet bibendum enim. Morbi leo urna molestie at elementum. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Id cursus metus aliquam eleifend mi. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed.

Quam pellentesque nec nam aliquam sem. Diam quis enim lobortis scelerisque. Varius quam quisque id diam vel. Quis eleifend quam adipiscing vitae proin sagittis nisl. Metus vulputate eu scelerisque felis imperdiet proin. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Pharetra vel turpis nunc eget lorem. Iaculis urna id volutpat lacus laoreet non curabitur. Pharetra diam sit amet nisl. Porta non pulvinar neque laoreet suspendisse interdum. Rutrum quisque non tellus orci ac auctor augue mauris.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor. Nunc sed velit dignissim sodales ut eu sem integer. Vitae nunc sed velit dignissim sodales. Arcu dictum varius duis at consectetur lorem donec. Quis varius quam quisque id. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Morbi quis commodo odio aenean sed adipiscing diam donec. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Diam quis enim lobortis scelerisque fermentum. Diam maecenas sed enim ut sem viverra aliquet eget sit. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Tortor vitae purus faucibus ornare suspendisse. Consequat interdum varius sit amet mattis vulputate. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Id velit ut tortor pretium viverra suspendisse potenti. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Velit euismod in pellentesque massa placerat duis. Sit amet commodo nulla facilisi nullam vehicula ipsum a.

Tincidunt id aliquet risus feugiat in ante metus. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Semper quis lectus nulla at volutpat diam ut venenatis tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. Mollis nunc sed id semper. Tincidunt praesent semper feugiat nibh. Sapien eget mi proin sed libero enim sed faucibus turpis. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Amet porttitor eget dolor morbi non arcu risus quis. Leo urna molestie at elementum eu facilisis sed odio. Sed nisi lacus sed viverra tellus. Ornare aenean euismod elementum nisi quis eleifend. Sit amet porttitor eget dolor morbi. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Pellentesque diam volutpat commodo sed. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut.

Turpis nunc eget lorem dolor sed viverra. Eget dolor morbi non arcu risus quis varius. Tortor condimentum lacinia quis vel eros donec. Pharetra convallis posuere morbi leo. Turpis egestas pretium aenean pharetra magna ac. Lobortis elementum nibh tellus molestie nunc. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Sodales ut eu sem integer vitae justo eget magna. Integer malesuada nunc vel risus commodo. Lacus luctus accumsan tortor posuere ac ut consequat semper. Diam maecenas ultricies mi eget mauris. Ut consequat semper viverra nam libero justo laoreet sit. Dolor purus non enim praesent. A lacus vestibulum sed arcu non odio euismod lacinia. Porta non pulvinar neque laoreet. Augue eget arcu dictum varius duis. Enim eu turpis egestas pretium. Scelerisque eu ultrices vitae auctor eu augue. Vulputate enim nulla aliquet porttitor lacus luctus accumsan.

Justo donec enim diam vulputate. Et malesuada fames ac turpis egestas maecenas pharetra. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Feugiat nibh sed pulvinar proin gravida. Morbi tristique senectus et netus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Vel fringilla est ullamcorper eget. Id faucibus nisl tincidunt eget nullam. Orci a scelerisque purus semper eget. Vehicula ipsum a arcu cursus vitae congue mauris. Nunc lobortis mattis aliquam faucibus purus in. Eleifend mi in nulla posuere sollicitudin. Ipsum nunc aliquet bibendum enim. Morbi leo urna molestie at elementum. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Id cursus metus aliquam eleifend mi. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed.

Quam pellentesque nec nam aliquam sem. Diam quis enim lobortis scelerisque. Varius quam quisque id diam vel. Quis eleifend quam adipiscing vitae proin sagittis nisl. Metus vulputate eu scelerisque felis imperdiet proin. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Pharetra vel turpis nunc eget lorem. Iaculis urna id volutpat lacus laoreet non curabitur. Pharetra diam sit amet nisl. Porta non pulvinar neque laoreet suspendisse interdum. Rutrum quisque non tellus orci ac auctor augue mauris.
`

const Category: NextPage<CategoryProps> = ({ data }) => {
    const router = useRouter()
    const category = data.categories[2]
    return (
        <Layout
            data={data}
            title={router.asPath.split('/')[2] + ' | Redux Ecosystem'}
            description="A collection of Redux-related addons, libraries, and utilities."
            canonical={'https://localhost:3000' + router.asPath}
        >
            {/* {data.categories.map((category) => (
                <CardList key={category.slug} category={category} />
            ))} */}
            <CardList key={category.slug} category={category} />
        </Layout>
    )
}

Category.getInitialProps = async ({}) => {
    const r = await fetch('http://localhost:3000/database.json')
    const data: CategoryProps['data'] = await r.json()
    return { data }
}

export default Category
