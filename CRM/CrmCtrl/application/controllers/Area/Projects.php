<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );
class Projects extends AREA_Controller {


	function index() {
		$data[ 'title' ] = lang( 'areatitleprojects' );
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$this->load->view( 'area/projects/index', $data );
	}

	function project( $id ) {
		$project = $this->Projects_Model->get_projects( $id );
		$data[ 'title' ] = $project[ 'name' ];
		$data[ 'projects' ] = $this->Projects_Model->get_projects( $id );
		$this->load->view( 'area/projects/project', $data );
	}
}