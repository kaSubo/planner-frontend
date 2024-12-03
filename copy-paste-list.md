# copy-paste

### Filters
```
import { useState, useEffect } from 'react';

const ArticlesPage = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Получить категории
    fetch('http://localhost:1337/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    // Получить статьи по выбранной категории
    const categoryFilter = selectedCategory ? `?filters[category][name][$eq]=${selectedCategory}` : '';
    fetch(`http://localhost:1337/api/articles${categoryFilter}`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, [selectedCategory]);

  return (
    <div>
      <div>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.name)}>
            {cat.name}
          </button>
        ))}
      </div>
      <div>
        {articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <img src={article.image.url} alt={article.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
```

### Hero section
```
import Image from 'next/image';
import heroImage from '../public/hero-image.png'; // Укажите путь к вашей загруженной картинке

const HeroSection = () => {
  return (
    <section className="relative bg-gray-50">
      <div className="container mx-auto px-6 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Текстовая часть */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-tight">
              ARCHITECTURE
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              We, as a brand, turn your dreams into fantastique interiors and architectural designs. 
              Our projects inspire the pursuit of your great aspirations. We create the alchemy of 
              luxury and the enjoyment of our clientèle.
            </p>
            <button className="mt-8 px-6 py-3 text-white bg-black rounded-full shadow-lg hover:bg-gray-800">
              All projects
            </button>
          </div>

          {/* Картинка */}
          <div className="relative">
            <Image
              src={heroImage}
              alt="Modern architecture design"
              className="rounded-lg shadow-lg"
              layout="responsive"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
```

### Fetching images in strapi
```
import axios from 'axios';

const fetchArticles = async () => {
  const { data } = await axios.get('http://localhost:1337/api/articles', {
    params: {
      populate: '*', // Включает все связанные поля, включая картинки
    },
  });
  return data;
};
```
---
```
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchArticles = async () => {
  const { data } = await axios.get('http://localhost:1337/api/articles', {
    params: {
      populate: '*', // Загружаем связанные данные
    },
  });
  return data;
};

const useArticles = () => {
  return useQuery(['articles'], fetchArticles);
};

export default useArticles;
```
---
```
import useArticles from './hooks/useArticles';

const Articles = () => {
  const { data, isLoading, error } = useArticles();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles.</p>;

  return (
    <div>
      {data.data.map((article) => (
        <div key={article.id} className="article">
          <h2>{article.attributes.title}</h2>
          <p>{article.attributes.content}</p>
          {article.attributes.image?.data && (
            <img
              src={`http://localhost:1337${article.attributes.image.data.attributes.url}`}
              alt={article.attributes.title}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Articles;
```
---
```
import Image from 'next/image';

{article.attributes.image?.data && (
  <Image
    src={`http://localhost:1337${article.attributes.image.data.attributes.url}`}
    alt={article.attributes.title}
    width={600}
    height={400}
  />
)}
```

### Single article page (with [slug].js pathway)
```
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchArticle = async (id) => {
  const { data } = await axios.get(`http://localhost:1337/api/articles/${id}`, {
    params: {
      populate: '*', // Подгружаем все связанные данные
    },
  });
  return data;
};

const useArticle = (id) => {
  return useQuery(['article', id], () => fetchArticle(id), {
    enabled: !!id, // Выполняем запрос только если есть ID
  });
};

export default useArticle;
```
---
```
import { useRouter } from 'next/router';
import useArticle from '../../hooks/useArticle';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query; // Получаем ID статьи из маршрута
  const { data, isLoading, error } = useArticle(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading article.</p>;

  const article = data.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{article.attributes.title}</h1>
      <img
        src={`http://localhost:1337${article.attributes.image.data.attributes.url}`}
        alt={article.attributes.title}
        className="my-4"
      />
      <p>{article.attributes.content}</p>
    </div>
  );
};

export default ArticlePage;
```
---
```
import Link from 'next/link';
import useArticles from './hooks/useArticles';

const Articles = () => {
  const { data, isLoading, error } = useArticles();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles.</p>;

  return (
    <div className="container mx-auto p-4">
      {data.data.map((article) => (
        <div key={article.id} className="mb-4">
          <Link href={`/articles/${article.id}`}>
            <a className="text-blue-500 hover:underline">
              <h2 className="text-xl font-bold">{article.attributes.title}</h2>
            </a>
          </Link>
          <p>{article.attributes.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Articles;
```
---
```
import axios from 'axios';

export async function getStaticPaths() {
  const { data } = await axios.get('http://localhost:1337/api/articles');
  const paths = data.data.map((article) => ({
    params: { id: article.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(`http://localhost:1337/api/articles/${params.id}`, {
    params: {
      populate: '*',
    },
  });

  return { props: { article: data.data } };
}

const ArticlePage = ({ article }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{article.attributes.title}</h1>
      <img
        src={`http://localhost:1337${article.attributes.image.data.attributes.url}`}
        alt={article.attributes.title}
        className="my-4"
      />
      <p>{article.attributes.content}</p>
    </div>
  );
};

export default ArticlePage;
```
---
```
<div className="container mx-auto p-4">
  <h1 className="text-4xl font-extrabold mb-4">{article.attributes.title}</h1>
  <img
    src={`http://localhost:1337${article.attributes.image.data.attributes.url}`}
    alt={article.attributes.title}
    className="rounded-lg shadow-md"
  />
  <p className="text-lg leading-relaxed mt-4">{article.attributes.content}</p>
</div>
```
