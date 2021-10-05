<!DOCTYPE html>

<html>

<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title><?php wp_title(); ?></title>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<header class="main-header">
		<div class="container-fluid">
			<div class="row align-items-center justify-content-between">
				<div class="col-3 col-sm-2 col-md-4 col-lg-3">
					<a href="/" class="header-logo d-none d-md-block">
						<?php
						// check to see if the logo exists and add it to the page
						if ( get_theme_mod( 'header_logo' ) ) : ?>
							<img src="<?php echo get_theme_mod( 'header_logo' ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" >
						<?php // add a fallback if the logo doesn't exist
						else : ?>
							<h1 class="site-title"><?php bloginfo( 'name' ); ?></h1>
						<?php endif; ?>
					</a>
					<a href="/" class="header-logo d-md-none">
						<?php
						// check to see if the logo exists and add it to the page
						if ( get_theme_mod( 'mobile_logo' ) ) : ?>
							<img src="<?php echo get_theme_mod( 'mobile_logo' ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" >
						<?php // add a fallback if the logo doesn't exist
						else : ?>
							<h1 class="site-title"><?php bloginfo( 'name' ); ?></h1>
						<?php endif; ?>
					</a>
				</div>
	      <div class="col-9 col-sm-10 col-md-4 col-lg-3 text-right">
	      	<?php
	      	  wp_nav_menu([
	      	    'theme_location'    => 'social',
	      	    'depth'             => 1,
	      	    'container'         => '',
	      	    'container_class'   => '',
	      	    'container_id'      => '',
	      	    'menu_class'        => 'social-nav',
	      	    'echo'							=> true
	      	  ]);
	      	?>
	      </div>
			</div>
		</div>
	</header>


	<?php /* Example menu:

	<nav class="navbar navbar-expand-lg navbar-light">
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
		<?php

			wp_nav_menu([
				'theme_location'    => 'primary',
				'depth'             => 2,
				'container'         => '',
				'container_class'   => '',
				'container_id'      => '',
				'menu_class'        => 'navbar-nav mr-auto',
				'echo'				=> true,
				'walker'            => new bs4Navwalker()
			]);

		?>
	  </div>
  	</nav>

  	*/ ?>
