<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6c2ed1de3f4f98885215d3543a6d5f23
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Stripe\\' => 7,
        ),
        'P' => 
        array (
            'Psr\\Log\\' => 8,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Stripe\\' => 
        array (
            0 => __DIR__ . '/..' . '/stripe/stripe-php/lib',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/Psr/Log',
        ),
    );

    public static $prefixesPsr0 = array (
        'P' => 
        array (
            'PayPal' => 
            array (
                0 => __DIR__ . '/..' . '/paypal/rest-api-sdk-php/lib',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit6c2ed1de3f4f98885215d3543a6d5f23::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit6c2ed1de3f4f98885215d3543a6d5f23::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit6c2ed1de3f4f98885215d3543a6d5f23::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
