<?php
  $video_section_background = get_stylesheet_directory_uri() . '/images/bkgd4_straight.png';
  $footer_mobile_background = get_stylesheet_directory_uri() . '/images/bkgd4_mobile.jpg';
?>
<footer class="main-footer">
  <canvas id="footer-section-background" data-background-image="<?php echo $video_section_background; ?>"></canvas>
  <div class="mobile-background" style="background-image:url('<?php echo $footer_mobile_background;?>')"></div>
  <div class="container-fluid center-container">

    <div class="row align-items-center">
      <div class="col-12">
        <div class="footer-wrapper">

          <div class="footer-content">

            <?php if(get_field('footer_title', 'option')) : ?>
              <div class="footer-title-wrapper">
                <div class="animated-accents triangles">
                  <div class="accent-1"></div>
                  <div class="accent-4"></div>
                  <div class="accent-7"></div>
                  <div class="accent-8"></div>
                </div>
                <div class="animated-accents lightning-bolts">
                  <div class="accent-2"></div>
                  <div class="accent-6"></div>
                  <div class="accent-10"></div>
                </div>
                <div class="animated-accents stars">
                  <div class="accent-3"></div>
                  <div class="accent-5"></div>
                  <div class="accent-9"></div>
                  <div class="accent-11 d-none d-md-block"></div>
                </div>
                <h2><?php the_field('footer_title', 'option'); ?></h2>
              </div>
            <?php endif; ?>

            <?php /*
            <form class="form-inline newsletter-form">
              <div class="form-group mb-2">
                <label for="newsletter-email" class="sr-only">Email</label>
                <input type="email" class="form-control" id="newsletter-email" placeholder="Your Email Address">
              </div>
              <button type="submit" class="btn btn-secondary mb-2">Sign Up</button>
            </form>*/
            echo do_shortcode('[yikes-mailchimp form="1"]');
            ?>

            <?php if (get_field('footer_copy', 'option')) : ?>
              <div class="footer-text"><?php the_field('footer_copy', 'option'); ?></div>
            <?php endif; ?>

            <?php
              if(get_theme_mod( 'app_link' )) :
                $image = get_field('footer_dl_image', 'option');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)

                if( $image ) {
                	echo '<a href="'.get_theme_mod( 'app_link' ).'" target="_blank">'.wp_get_attachment_image( $image, $size ).'</a>';
                }
              endif;
            ?>
            <?php
              if(get_theme_mod( 'gp_link' )) :
                $image = get_field('footer_gp_image', 'option');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)

                if( $image ) {
                	echo '<a href="'.get_theme_mod( 'gp_link' ).'" target="_blank">'.wp_get_attachment_image( $image, $size ).'</a>';
                }
              endif;
            ?>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="legal-text">
    <div class="container-fluid">
      <div class="footer-nav">
        <?php
          wp_nav_menu([
            'theme_location'    => 'footer',
            'depth'             => 1,
            'container'         => '',
            'container_class'   => '',
            'container_id'      => '',
            'menu_class'        => 'footer-nav',
            'echo'							=> true
          ]);
        ?>
      </div>
      <p>
        <?php echo '&copy; '.date('Y').' '.get_theme_mod( 'footer_legal' ); ?>
      </p>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
