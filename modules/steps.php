<section class="steps-section">
  <div class="container-fluid center-container">
    <?php if(get_field('steps_title')) : ?>
      <h2><?php the_field('steps_title'); ?></h2>
    <?php endif; ?>
    <?php
    // check if the repeater field has rows of data
    if( have_rows('steps_repeater') ):
     	// loop through the rows of data ?>
      <div class="accent-2 d-none d-sm-block"></div>
      <div class="row justify-content-center align-content-center">
        <?php
        $count = 0;
        while ( have_rows('steps_repeater') ) : the_row();
          $count++;?>
          <div class="col-sm-4 col-md-3 col-xl-2-5 img-col">
            <?php
            // display a sub field value
            $image = get_sub_field('image');
            $size = 'large'; // (thumbnail, medium, large, full or custom size)
            if($count == 3) {
              echo '<div class="accent-2 d-sm-none"></div>';
            }

            if( $image ) {
            	echo '<div class="img-shadow">';

              if($count == 1) :
                echo '<div class="accent-3"></div>';
              elseif($count == 2) :
                echo '<div class="accent-4"></div>';
              endif;

              echo wp_get_attachment_image( $image, $size );

              if($count == 2) {
                echo '<div class="accent-1"></div>';
              }
              echo '</div>';
            }
            ?>
            <div class="step-text">
              <?php if(get_sub_field('title')) : ?>
                <h3><?php the_sub_field('title'); ?></h3>
              <?php endif; ?>
              <?php the_sub_field('copy'); ?>
            </div>
          </div>
        <?php
        endwhile; ?>
      </div>
    <?php
    else :
        // no rows found
    endif;
    ?>
  </div>
</section>
