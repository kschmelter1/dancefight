<section class="dl-section small-section">
  <div class="container-fluid center-container">
    <div class="row align-items-center">
      <div class="col-md-6 col-lg-7">

        <div class="dl-accents"><div></div><div></div></div>
        <?php $imgs = get_field('dl_gallery'); if ($imgs) : ?>
            <div id="cubeShadow"></div>

        <div id="dl-cube-wrapper">

          <div class="viewport">

            <div class="cube" id="cube">
              <?php $iC = 0; for ($i = 0; $i < 6; $i++) : ?>
              <div class="side">
                  <?php if (count($imgs) == 6) : ?>
                    <div class="cube-image single">
                      <img src="<?php echo $imgs[$i]['sizes']['large'];?>" alt="<?php echo $imgs[$i]['alt'];?>" >
                    </div>
                  <?php else : ?>
                    <div class="cube-image split">
                      <img src="<?php echo $imgs[$iC]['sizes']['large'];?>" alt="<?php echo $imgs[$iC]['alt'];?>" >
                      <img src="<?php echo $imgs[$iC+1]['sizes']['large'];?>" alt="<?php echo $imgs[$iC+1]['alt'];?>" >
                    </div>
                  <?php $iC=$iC+2; endif; ?>
              </div>
            <?php endfor; ?>
            </div>
          </div>
        </div>
        <?php endif; ?>

      </div>
      <div class="col-md-6 col-lg-5">

        <div class="dl-text">
            <?php if(get_field('dl_title')) : ?>
              <h2><?php the_field('dl_title'); ?></h2>
            <?php endif; ?>
            <?php if(get_field('dl_text')) : ?>
              <div class="dl-text-content"><?php echo get_field('dl_text'); ?></div>
            <?php endif; ?>
            <?php
              // If the download link is configured in the customizer display the download button
              if(get_theme_mod( 'app_link' )) :
                $image = get_field('dl_dl_image');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)

                if( $image ) {
                  echo '<a href="'.get_theme_mod( 'app_link' ).'" target="_blank" class="d-none d-sm-inline-block">'.wp_get_attachment_image( $image, $size ).'</a>';
                }
              endif;
            ?>
            <?php
              // If the download link is configured in the customizer display the download button
              if(get_theme_mod( 'gp_link' )) :
                $image = get_field('dl_gp_image');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)

                if( $image ) {
                  echo '<a href="'.get_theme_mod( 'gp_link' ).'" target="_blank" class="d-none d-sm-inline-block">'.wp_get_attachment_image( $image, $size ).'</a>';
                }
              endif;
            ?>
        </div>

      </div>
    </div>
  </div>
</section>
