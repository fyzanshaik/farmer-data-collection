import multer from 'multer';

export const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
	fileFilter: (req, file, cb) => {
		if (file.fieldname === 'photo') {
			if (!file.mimetype.startsWith('image/')) {
				return cb(new Error('Only images allowed for photo'));
			}
		}
		if (file.fieldname === 'aadhar' || file.fieldname === 'land' || file.fieldname === 'bank') {
			if (file.mimetype !== 'application/pdf') {
				return cb(new Error('Only PDF files allowed for documents'));
			}
		}
		cb(null, true);
	},
});

export const fileFields = [
	{ name: 'photo', maxCount: 1 },
	{ name: 'aadhar', maxCount: 1 },
	{ name: 'land', maxCount: 1 },
	{ name: 'bank', maxCount: 1 },
] as const;
