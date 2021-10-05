<?php /**
* Create Logo Setting and Upload Control
*/
function your_theme_new_customizer_settings($wp_customize) {
  // add a setting for the site logo
  $wp_customize->add_setting('header_logo');
  $wp_customize->add_setting('mobile_logo');
  $wp_customize->add_setting('app_link');
  // $wp_customize->add_setting('company_text');
  // $wp_customize->add_setting('address_text');
  // $wp_customize->add_setting('city_text');
  // $wp_customize->add_setting('state_text');
  // $wp_customize->add_setting('zip_text');
  // $wp_customize->add_setting('phone_num');
  // $wp_customize->add_setting('email_text');
  $wp_customize->add_setting('footer_legal');
  $wp_customize->add_setting('app_link');
  $wp_customize->add_setting('gp_link');
  //$wp_customize->add_setting('footer_seo');
  // Add a control to upload the logo
  $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'header_logo',
      array(
        'label' => 'Logo',
        'section' => 'title_tagline',
        'settings' => 'header_logo',
      )
    )
  );
  $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'mobile_logo',
      array(
        'label' => 'Mobile Logo',
        'section' => 'title_tagline',
        'settings' => 'mobile_logo',
      )
    )
  );

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'app_link',
  		    array(
  		        'label'    => 'iTunes Link',
  		        'section'  => 'title_tagline',
  		        'settings' => 'app_link',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gp_link',
  		    array(
  		        'label'    => 'Google Play Link',
  		        'section'  => 'title_tagline',
  		        'settings' => 'gp_link',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'company_text',
  		    array(
  		        'label'    => 'Company Name',
  		        'section'  => 'title_tagline',
  		        'settings' => 'company_text',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'address_text',
  		    array(
  		        'label'    => 'Address',
  		        'section'  => 'title_tagline',
  		        'settings' => 'address_text',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'city_text',
  		    array(
  		        'label'    => 'City',
  		        'section'  => 'title_tagline',
  		        'settings' => 'city_text',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'state_text',
  		    array(
  		        'label'    => 'State',
  		        'section'  => 'title_tagline',
  		        'settings' => 'state_text',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'zip_text',
  		    array(
  		        'label'    => 'Zip',
  		        'section'  => 'title_tagline',
  		        'settings' => 'zip_text',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'phone_num',
  		    array(
  		        'label'    => 'Phone',
  		        'section'  => 'title_tagline',
  		        'settings' => 'phone_num',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'email_text',
  		    array(
  		        'label'    => 'Email',
  		        'section'  => 'title_tagline',
  		        'settings' => 'email_text',
  		        'type'     => 'text'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'footer_legal',
  		    array(
  		        'label'    => 'Legal',
  		        'section'  => 'title_tagline',
  		        'settings' => 'footer_legal',
  		        'type'     => 'textarea'
  		    )
  	    )
  	);

  	$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'footer_seo',
  		    array(
  		        'label'    => 'SEO',
  		        'section'  => 'title_tagline',
  		        'settings' => 'footer_seo',
  		        'type'     => 'textarea'
  		    )
  	    )
  	);
}
add_action('customize_register', 'your_theme_new_customizer_settings');
