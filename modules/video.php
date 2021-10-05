<?php
  // $video_section_background = get_stylesheet_directory_uri() . '/images/bkgd2_original.png';
  $video_section_background = get_stylesheet_directory_uri() . '/images/DF_wordmark_purple.png';
  $svg_clip_path = file_get_contents(get_stylesheet_directory() . '/images/video/video-clip-path.svg');
  $video_mask = get_stylesheet_directory_uri() . '/images/video/video-composite-mask-white.png';
  $video_still = get_stylesheet_directory_uri() . '/images/video/video-mp4-still.jpg';
  $youtube_video_url = get_field('video_youtube_link');
  $youtube_video_id = get_youtube_video_id($youtube_video_url);
  $mp4_video_url = get_field('video_mp4');
  $image = get_field('video_image');
  $image_hidden = $image && !$youtube_video_id && !$mp4_video_url ? false : true;
  // $image_hidden = false;

  function get_youtube_video_id($url) {
    if ( !$url) return false;

    /* YouTube video id regex from https://stackoverflow.com/questions/3392993/php-regex-to-get-youtube-video-id */
    $youtube_video_id_regex = preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $url, $matches);

    return $matches && isset($matches[1]) ? $matches[1] : false;
  }
?>

<section class="video-section">
  <canvas id="video-section-background" data-background-image="<?php echo $video_section_background; ?>"></canvas>
  <div class="video-section-background-gradient"></div>
  <div class="container-fluid center-container">
    <div class="row align-items-center">
      <div class="col-sm-6">
        <div class="img-wrapper">
          <div class="accent-1"></div>
          <div class="accent-2"></div>
          <div class="accent-3"></div>

          <!-- static image logo -->
          <?php if ( $image_hidden ) : ?>
            <img id="svg-logo-space-holder" class="invisible" src="<?php echo $video_mask; ?>" alt="">
          <?php else: ?>
            <?php echo wp_get_attachment_image( $image, 'large' ); ?>
          <?php endif; ?>

          <!-- YouTube video logo -->
          <?php if ( $youtube_video_id && $svg_clip_path ) : ?>
            <div class="youtube-video-wrapper video-embed-responsive d-none">
              <iframe class="youtube-embed" width="560" height="315" data-src="https://www.youtube.com/embed/<?php echo $youtube_video_id ?>?autoplay=1&loop=1&mute=1&playlist=<?php echo $youtube_video_id ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <div class="video-click-blocker"></div>
            </div>
            <?php echo $svg_clip_path; ?>
          <?php endif; ?>

          <!-- mp4 + canvas video logo -->
          <?php if ( $mp4_video_url && $video_mask ) : ?>
            <canvas id="video-canvas" class="d-none"></canvas>

            <script>
              var videoMaskImage = "<?php echo $video_mask; ?>";
              var mp4VideoStill = "<?php echo $video_still; ?>"
              var mp4Video = "<?php echo $mp4_video_url; ?>"
            </script>
          <?php endif ?>

        </div>
      </div>
      <div class="col-sm-6 col-lg-4 offset-lg-1">
        <?php if(get_field('video_title')) : ?>
          <h2><?php the_field('video_title'); ?></h2>
        <?php endif; ?>
        <?php the_field('video_copy'); ?>
      </div>
    </div>
  </div>
</section>
