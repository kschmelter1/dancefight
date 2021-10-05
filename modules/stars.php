<section class="stars-section">
  <div class="container-fluid center-container">
    <div class="row align-items-center">
      <div class="col-sm-6 order-sm-2">
        <?php
          $image = get_field('stars_image');
          $size = 'large'; // (thumbnail, medium, large, full or custom size)

          if( $image ) {
          	echo '<div class="img-wrapper">'.wp_get_attachment_image( $image, $size );?>

            <div class="stars-holder">
              <div class="accent-1"></div>
              <div class="accent-4"></div>
              <div class="accent-5"></div>
              <div class="accent-8"></div>
            </div>
            <div class="lightning-bolts-holder">
              <div class="accent-2"></div>
              <div class="accent-3"></div>
              <div class="accent-6"></div>
              <div class="accent-7"></div>
            </div>
          <?php
            echo '</div>';
          }
        ?>
      </div>
      <div class="col-sm-6 col-lg-4 offset-lg-1">
        <?php if(get_field('stars_title')) : ?>
          <h2><?php the_field('stars_title'); ?></h2>
        <?php endif; ?>
        <?php the_field('stars_copy'); ?>
      </div>
    </div>
  </div>
</section>
