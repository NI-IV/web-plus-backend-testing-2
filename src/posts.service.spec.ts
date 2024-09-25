import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany();

      expect(result).toHaveLength(4); // должно вернуть все посты
      expect(result.map((post) => post.text)).toEqual(posts.map((p) => p.text));
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany({ skip: 1, limit: 2 });

      expect(result).toHaveLength(2); // должно вернуть 2 поста
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    it('should return posts correctly when skip is greater than the number of posts', () => {
      const result = postsService.findMany({ skip: 5 });

      expect(result).toHaveLength(0); // не должно вернуть постов, так как skip > длина массива
    });

    it('should return posts correctly when limit exceeds the number of posts', () => {
      const result = postsService.findMany({ limit: 10 });

      expect(result).toHaveLength(4); // должно вернуть все посты, так как limit больше количества постов
    });

    it('should return correct posts when only skip is provided', () => {
      const result = postsService.findMany({ skip: 2 });

      expect(result).toHaveLength(2); // должно вернуть 2 оставшихся поста
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return correct posts when only limit is provided', () => {
      const result = postsService.findMany({ limit: 3 });

      expect(result).toHaveLength(3); // должно вернуть 3 поста
      expect(result[0].text).toBe('Post 1');
      expect(result[2].text).toBe('Post 3');
    });
  });
});