import {
  FC, useEffect, useState, useCallback, memo,
} from 'react';
import cn from 'classnames';
import './InputFile.scss';

type Props = {
  label: string,
  addFile: (file: File | null) => void,
};

const allowedFileTypes = ['image/jpg', 'image/jpeg'];

export const InputFile: FC<Props> = memo(({
  label,
  addFile,
}) => {
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState('');

  const checkName = useCallback(() => {
    let isValid;

    if (file) {
      const fileType = file.type;

      isValid = allowedFileTypes.includes(fileType);

      if (isValid) {
        const fileSizeKiloBytes = file.size / 1024;

        isValid = fileSizeKiloBytes < 5120;

        const img = document.createElement('img');

        img.onload = function () {
          const width = img.naturalWidth || img.width;
          const height = img.naturalHeight || img.height;

          isValid = width > 70 && height > 70;

          if (!isValid) {
            setFileError(curr => (
              curr
                ? `${curr}. Minimum size of photo 70x70px`
                : 'Minimum size of photo 70x70px'
            ));
          }
        };

        img.src = window.URL.createObjectURL(file);

        if (!fileError && !isValid) {
          setFileError('The photo size must not be greater than 5 Mb');
        }
      } else {
        setFileError('The photo format must be jpeg/jpg type');
      }
    }
  }, [file]);

  const handleInput = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }

    setFileError('');
  }, []);

  useEffect(() => {
    if (file) {
      checkName();
    }
  }, [file]);

  useEffect(() => {
    if (fileError && file) {
      addFile(null);
    }

    if (!fileError && file) {
      addFile(file);
    }
  }, [file, fileError]);

  return (
    <div className="input-file">
      <input
        type="file"
        onChange={handleInput}
        id="file"
      />
      <label
        className="input-file__field"
        htmlFor="file"
      >
        <span
          className={cn(
            'input-file__upload-btn',
            { 'input-file__upload-btn--border-danger': fileError },
          )}
        >
          Upload
        </span>
        <span
          className={cn(
            'input-file__label',
            { 'input-file__label--border-danger': fileError },
          )}
        >
          {file ? file.name : label}
        </span>
      </label>
      {fileError && (
        <p className="input-file__error">{fileError}</p>
      )}
    </div>
  );
});
