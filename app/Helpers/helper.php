<?php
function defaultImage( $size ): string
{
    return env('PLACEHOLDER_IMAGE_URL').$size.'.png';
}
