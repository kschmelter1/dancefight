<?php

function compulse_enqueue_scripts() {
	$style_name = 'compulse';
	$version = '080518_10:05am';

	wp_enqueue_script('jquery');

	wp_register_style($style_name, get_stylesheet_directory_uri() . '/style.css', array(), $version);
	wp_enqueue_style($style_name);

	wp_enqueue_script('vendor', get_stylesheet_directory_uri() . '/js/vendor.js', array(), '', true);
	wp_enqueue_script('app', get_stylesheet_directory_uri() . '/js/app.js', array(), $version, true);
}
add_action('wp_enqueue_scripts', 'compulse_enqueue_scripts');

// SVG media upload compatible
function add_file_types_to_uploads($file_types){
  $new_filetypes = array();
  $new_filetypes['svg'] = 'image/svg+xml';
  $file_types = array_merge($file_types, $new_filetypes );
  return $file_types;
}
add_action('upload_mimes', 'add_file_types_to_uploads');


register_nav_menus( array(
		'social' => 'Social Nav',
    'footer' => 'Footer Menu',
) );

if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}

/**
* Customizer additions.
*/
require get_template_directory() . '/customizer.php';

require_once 'bs4Navwalker.php';
