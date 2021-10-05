<section class="vs-section">
  <div class="container-fluid center-container">
    <div class="row align-items-center">
      <div class="col-12">
        <div class="accent-1"></div>
        <div class="accent-2"></div>

        <div class="row align-items-center">
          <div class="col-sm-5 img-left text-right">
            <div class="accent-l1"></div>
            <div class="accent-l2"></div>
            <div class="accent-l3"></div>
            <div class="img-wrapper">
              <?php
              // display a sub field value
              $image = get_field('vs_left_image');
              $size = 'large'; // (thumbnail, medium, large, full or custom size)

              if( $image ) {
                echo wp_get_attachment_image( $image, $size );
              }
              ?>
            </div>
            <div class="accent-l4"></div>
          </div>
          <div class="col-sm-2 vs-text">
            <div class="accent-3"></div>
            VS
          </div>
          <div class="col-sm-5 img-right text-left">
            <div class="accent-r1"></div>
            <div class="accent-r2"></div>
            <div class="accent-r3"></div>
            <div class="img-wrapper">
              <?php
              // display a sub field value
              $image = get_field('vs_right_image');
              $size = 'large'; // (thumbnail, medium, large, full or custom size)

              if( $image ) {
                echo wp_get_attachment_image( $image, $size );
              }
              ?>
            </div>
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-md-6 offset-md-3 text-wrapper">
            <h2><?php the_field('vs_title'); ?></h2>
            <?php
              if(get_theme_mod( 'app_link' )) :
                $image = get_field('vs_dl_image');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)

                if( $image ) {
                  echo '<a href="'.get_theme_mod( 'app_link' ).'" target="_blank" class="hero-dl">'.wp_get_attachment_image( $image, $size ).'</a>';
                }
              endif;
            ?>
            <?php
              if(get_theme_mod( 'gp_link' )) :
                $image = get_field('vs_gp_image');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)

                if( $image ) {
                  echo '<a href="'.get_theme_mod( 'gp_link' ).'" target="_blank" class="hero-dl">'.wp_get_attachment_image( $image, $size ).'</a>';
                }
              endif;
            ?>
            <?php the_field('vs_copy'); ?>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
