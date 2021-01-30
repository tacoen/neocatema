<?php
namespace Grav\Theme;

use Gantry\Framework\Gantry;
use Gantry\Framework\Theme as GantryTheme;
use Grav\Common\Grav;
use Grav\Common\Theme;
use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;

use RocketTheme\Toolbox\ResourceLocator\UniformResourceLocator;

class Neocatema extends Theme
{
	public $gantry = '5.4.0';

	/**
	 * @var GantryTheme
	 */
	protected $theme;

	/**
	 * @return array
	 */
	public static function getSubscribedEvents()
	{
		return [
			'onThemeInitialized' => ['onThemeInitialized', 0],
			'onAdminMenu' => ['onAdminMenu', 0],
			'onGetPageTemplates' => ['onGetPageTemplates', 0],
			'onGetPageBlueprints' => ['onGetPageBlueprints', 0],
			'onTwigTemplatePaths' => ['onTwigTemplatePaths', 0],
			'onTwigSiteVariables' => ['onTwigSiteVariables', 0],
			'onTwigExtensions' => ['onTwigExtensions', 0],
			'onOutputGenerated' => ['onOutputGenerated', 0],
//			'onShortcodeHandlers' => ['onShortcodeHandlers', 0],
//			 'onFormProcessed' => ['onFormProcessed', 0],
		];
	}

	public function onAdminMenu()
	{

		$theme_name = $this->name;

		$this->grav['assets']->add("user://themes/$theme_name/admin/poko.css",1);
		$this->grav['assets']->add("user://themes/$theme_name/js/w3color/w3color.js");
		$this->grav['assets']->add("user://themes/$theme_name/admin/poko.js");

	}

	public function onThemeInitialized()
	{
		if (defined('GRAV_CLI') && GRAV_CLI) {
			return;
		}

		$locator = $this->grav['locator'];
		$path = $locator('theme://');
		$name = $this->name;

		if (!class_exists('\Gantry5\Loader')) {
			if ($this->isAdmin()) {
				$messages = $this->grav['messages'];
				$messages->add('Please enable Gantry 5 plugin in order to use current theme!', 'error');
				return;
			} else {
				throw new \LogicException('Please install and enable Gantry 5 Framework plugin!');
			}
		}

		// Setup Gantry 5 Framework or throw exception.
		\Gantry5\Loader::setup();

		// Get Gantry instance.
		$gantry = Gantry::instance();

		// Set the theme path from Grav variable.
		$gantry['theme.path'] = $path;
		$gantry['theme.name'] = $name;

		// Define the template.
		require $locator('theme://includes/theme.php');

		// Define Gantry services.

		$gantry['theme'] = function ($c) {
			return new \Gantry\Theme\Neoca($c['theme.path'], $c['theme.name']);
		};
	}

	/*
	public function onShortcodeHandlers()
	{
		$theme_name = $this->name;
		$this->grav['shortcode']->registerAllShortcodes("user://themes/$theme_name/php/shortcodes");
	}
	*/

	public function onTwigSiteVariables()
	{
		$locator = $this->grav['locator'];
		$adminCookieSuffix = '-admin';
		$this->adminCookie = session_name() . $adminCookieSuffix;

		$this->config->set('buf',[]);

		/* Provide {{ config.gas }} */

		if (isset($_COOKIE[$this->adminCookie]) === true) {
			$this->config->set('gas.admin',true);
		}

	}

	public function onTwigExtensions()
	{
		require_once(__DIR__.'/php/GaskenTwigExtension.php');
		$this->grav['twig']->twig->addExtension(new GaskenTwigExtension());

		require_once(__DIR__.'/php/ncc-TwigExtension.php');
		$this->grav['twig']->twig->addExtension(new nccTwigExtension());

		//require_once(__DIR__.'/php/ColorMixerTwigExtension.php');
		//$this->grav['twig']->twig->addExtension(new ColorMixerTwigExtension());
	}


	public function onTwigTemplatePaths()
	{

		require_once(__DIR__.'/php/ncc-util.php');

		$locator = $this->grav['locator'];
		$theme_name = $this->name;

		create_ifnotexists($locator('user://').'/workspace/templates');
		create_ifnotexists($locator('user://').'/workspace/blueprints');
		create_ifnotexists($locator('user://')."/data/gantry5/themes/$theme_name/particles");

		create_ifnotexists($locator('user://').'/workspace/css');
		create_ifnotexists($locator('user://').'/workspace/scss');
		create_ifnotexists($locator('user://').'/workspace/js');
		create_ifnotexists($locator('user://').'/workspace/assets');
		create_ifnotexists($locator('user://').'/workspace/js/script.js','touch');
		create_ifnotexists($locator('user://').'/workspace/css/custom.css','touch');
		create_ifnotexists($locator('user://').'/workspace/scss/custom.scss',
			'copy',__DIR__.'/skel/user/workspace/scss/custom.scss');
		create_ifnotexists($locator('user://').'/workspace/scss/_grav-dependency.scss',
			'copy',__DIR__.'/skel/user/workspace/scss/_grav-dependency.scss');
		create_ifnotexists($locator('user://').'/workspace/scss-watch.sh',
			'copy',__DIR__.'//skel/user/workspace/scss-watch.sh');

		$this->grav['twig']->twig_paths[] = $locator('user://templates');
	}

	public function onGetPageTemplates(Event $event)
	{
		$types = $event->types;
		$types->scanTemplates('user://workspace/templates');
	}

	public function onGetPageBlueprints(Event $event)
	{
		$types = $event->types;
		$types->scanBlueprints('user://workspace/blueprints');
	}

	public function onOutputGenerated()
	{

		require_once(__DIR__.'/php/ncc-util.php');

		function createPath($path) {
			if (is_dir($path)) return true;
			$prev_path = substr($path, 0, strrpos($path, '/', -2) + 1 );
			$return = createPath($prev_path);
			return ($return && is_writable($prev_path)) ? mkdir($path) : false;
		}

		if (! $this->isAdmin()) {

			if (isset($this->config['theme']['tidy_output'])) {
				$this->grav->output = ncc_tidyup($this->grav->output."");
			}

		}
	}
}
