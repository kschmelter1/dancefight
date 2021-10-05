<section class="hero-section">
  <div class="accent-3"></div>
  <div class="hero-text hero-text-title d-block d-md-none d-lg-block">
    <div class="container-fluid">
      <?php if(get_field('hero_title')) : ?>
        <h1><?php the_field('hero_title'); ?><div class="accent-4"></div></h1>
      <?php endif; ?>
      <?php
        if(get_theme_mod( 'app_link' )) :
          $image = get_field('hero_dl_image');
          $size = 'medium'; // (thumbnail, medium, large, full or custom size)

          if( $image ) {
            echo '<a href="'.get_theme_mod( 'app_link' ).'" target="_blank" class="d-none d-lg-inline-block">'.wp_get_attachment_image( $image, $size ).'</a>';
          }
        endif;
      ?>
      <?php
        if(get_theme_mod( 'gp_link' )) :
          $image = get_field('hero_gp_image');
          $size = 'medium'; // (thumbnail, medium, large, full or custom size)

          if( $image ) {
            echo '<a href="'.get_theme_mod( 'gp_link' ).'" target="_blank" class="d-none d-lg-inline-block">'.wp_get_attachment_image( $image, $size ).'</a>';
          }
        endif;
      ?>
    </div>
  </div>
  <div class="container-fluid center-container">
    <div class="row align-items-center">
      <div class="col-12 hero-img">
        <?php
          $image = get_field('hero_image');
          $size = 'full'; // (thumbnail, medium, large, full or custom size)

          if( $image ) {
          	echo '<div class="img-wrapper-behind"></div>';
          	echo '<div class="img-wrapper"><div class="vs"></div>'.wp_get_attachment_image( $image, $size ).'</div>';
          }
        ?>
        <?php

        // check if the repeater field has rows of data
        if( have_rows('hero_slider') ): ?>
        <div class="carousel-wrap carousel-wrap1">
          <div class="accent-2 d-none d-lg-block"></div>
          <div class="swiper-container swiper-hero swiper-hero1">
            <div class="swiper-wrapper">
            <?php
            //this is kind of a hacky solution to prevent a jumping bug, but if it doesn't break anything else I'm not touching it
            $slideArray = array();
            $holdArray = array();
            $count = 0;
            $totalCount = count(get_field('hero_slider'));
           	// loop through the rows of data
            while ( have_rows('hero_slider') ) : the_row(); ?>
              <?php
              $image = get_sub_field('left_image');
              if( !empty($image) ):
                if($count <= 3) :
                  array_push($holdArray, '<div class="swiper-slide" style="background-image:url('.$image['sizes']['large'].');"></div>');
                else:
                  array_push($slideArray, '<div class="swiper-slide" style="background-image:url('.$image['sizes']['large'].');"></div>');
                endif;
              endif; ?>
            <?php
              $count++;
            endwhile;
            foreach($holdArray as $slide) :
              array_push($slideArray, $slide);
            endforeach;

            $reversedSlides = array_reverse($slideArray);
            foreach($reversedSlides as $slide) :
              echo $slide;
            endforeach;?>
            </div>
          </div>
        </div>
        <div class="carousel-wrap carousel-wrap2">
          <div class="accent-1"></div>
          <div class="swiper-container swiper-hero swiper-hero2">
            <div class="swiper-wrapper">
            <?php
           	// loop through the rows of data
            while ( have_rows('hero_slider') ) : the_row(); ?>
              <?php
              $image = get_sub_field('right_image');
              if( !empty($image) ): ?>
                <div class="swiper-slide" style="background-image:url(<?php echo $image['url']; ?>);"></div>
              <?php endif; ?>
            <?php
            endwhile; ?>
            </div>
          </div>
        </div>

        <?php

        else :

            // no rows found

        endif;

        ?>
        <div class="d-none d-lg-block hero-para">
          <?php the_field('hero_copy'); ?>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-text d-block d-lg-none">
    <div class="container-fluid">
      <?php if(get_field('hero_title')) : ?>
        <h1 class="d-none d-md-block"><div class="accent-4"></div><?php the_field('hero_title'); ?></h1>
      <?php endif; ?>
      <?php
        if(get_theme_mod( 'app_link' )) :
          $image = get_field('hero_dl_image');
          $size = 'medium'; // (thumbnail, medium, large, full or custom size)

          if( $image ) {
            echo '<a href="'.get_theme_mod( 'app_link' ).'" target="_blank" class="hero-dl">'.wp_get_attachment_image( $image, $size ).'</a>';
          }
        endif;
      ?>
      <?php
        if(get_theme_mod( 'gp_link' )) :
          $image = get_field('hero_gp_image');
          $size = 'medium'; // (thumbnail, medium, large, full or custom size)

          if( $image ) {
            echo '<a href="'.get_theme_mod( 'gp_link' ).'" target="_blank" class="hero-dl">'.wp_get_attachment_image( $image, $size ).'</a>';
          }
        endif;
      ?>
      <?php the_field('hero_copy'); ?>
    </div>
  </div>
</section>
