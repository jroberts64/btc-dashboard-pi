publish:
	aws s3 sync  --acl public-read public s3://btc.jack-roberts.com
	