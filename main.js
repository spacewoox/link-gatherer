import DataCollector from './DataCollector';

const dataCollectorInstance = new DataCollector();

dataCollectorInstance
  .setVariable('sort', 'seed')
  .setVariable('seed', '0.1601440408596233')
  .setVariable('quality', '1080p')

dataCollectorInstance.paginate((current) => {
  current['MovieList'].forEach((movie) => {
    const link_detail = movie['items'];
    const magnet = link_detail.length ? link_detail[0].torrent_magnet : null;
    if (magnet) {
      //console.log(`${movie.title} : ${magnet}`);
    }
    else {
      console.log(`${movie.title} : ${movie.items.length}`);
    }
  });
}, 2);
