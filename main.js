import DataCollector from './DataCollector';

const dataCollectorInstance = new DataCollector();

dataCollectorInstance
  .setVariable('sort', 'seed')
  .setVariable('seed', '0.1601440408596233')
  .setVariable('quality', '1080p')

dataCollectorInstance.paginate((current) => {
  current['MovieList'].forEach((movie) => {
    console.log(movie.title);
  });
});
