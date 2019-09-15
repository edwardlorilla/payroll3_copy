<?php
/**
 * Created by PhpStorm.
 * User: Edward Lance Lorilla
 * Date: 8/15/2019
 * Time: 12:26 AM
 */

namespace App\Lib;


class cf7_export_excel
{
    protected $doc_prop = array(
        'Author' => 'Name',
        'Company' => 'Company',
        'Created' => '',
    );
    protected $rows = array();
    protected $shared_strings = array();
    function __construct( $doc_prop = array() ) {
        $this->doc_prop = array_merge( $this->doc_prop, $doc_prop );
    }
    function can_xlsx() {
        return class_exists( 'ZipArchive', false );
    }
    function add_row( $fields ) {
        $this->rows[] = $fields;
    }
    function add_rows( $rows ) {
        $this->rows = array_merge( $this->rows, $rows );
    }

    function xml_save() {
        $xml_filename = tempnam( sys_get_temp_dir(), 'cf7-export-xml' );
        $this->doc_prop['Created'] = gmdate( 'Y-m-d\TH:i:s\Z' );
        $doc_prop_fields = array();
        foreach ( $this->doc_prop as $prop_key => $prop_value ) {
            $doc_prop_fields[] = sprintf(
                '<%1$s>%2$s</%1$s>',
                $prop_key,
                filter_var( $prop_value, FILTER_SANITIZE_SPECIAL_CHARS )
            );
        }
        $xml = sprintf(
            '<?xml version="1.0"?>
			<?mso-application progid="Excel.Sheet"?>
			<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
				xmlns:o="urn:schemas-microsoft-com:office:office"
				xmlns:x="urn:schemas-microsoft-com:office:excel"
				xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
				xmlns:html="http://www.w3.org/TR/REC-html40">
			<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
			 	%s
			</DocumentProperties>
			<Worksheet ss:Name="Sheet1">
				<Table>%s</Table>
			</Worksheet>
			</Workbook>',
            implode( "\n", $doc_prop_fields ),
            implode( "\n", $this->xml_get_rows() )
        );
        $save_xml = file_put_contents( $xml_filename, $xml );
        if ( $save_xml ) {
            return $xml_filename;
        }
        return new WP_Error(
            'export-xml-fail',
            __( 'Failed to save the exported Excel XML file.', 'cf7-storage' )
        );
    }
}