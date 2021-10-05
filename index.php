<?php

get_header();

?>

<section class="hero-section int-section">
  <div class="hero-text hero-text-title">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <h1><?php the_title(); ?></h1>
          <?php the_content(); ?>
        </div>
      </div>
    </div>
  </div>
</section>

<?php

get_footer();

?>
