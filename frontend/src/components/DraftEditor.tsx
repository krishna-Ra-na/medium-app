import { useState, useRef } from 'react';
import { ContentBlock, Editor, EditorState, RawDraftContentState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor: React.FC<{ onChange: (description: string) => void }> = ({ onChange }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editor = useRef<Editor>(null);


    const focusEditor = () => {
        if (editor.current) {
            editor.current.focus();
        }
    };

    const handleEditorChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        const rawContent: RawDraftContentState = convertToRaw(newEditorState.getCurrentContent());
        const rawContentString = JSON.stringify(rawContent); // Serialize the object to a string

        // Pass the string to onChange
        onChange(rawContentString);
    };

    // const handleKeyCommand = (command: EditorCommand, editorState: EditorState): boolean  => {
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if (newState) {
    //         handleEditorChange(newState);
    //         return true;
    //     }
    //     return false;
    // };

    // const mapKeyToEditorCommand = (e) => {
    //     if (e.keyCode === 9 /* TAB */) {
    //         const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
    //         if (newEditorState !== editorState) {
    //             handleEditorChange(newEditorState);
    //         }
    //         return;
    //     }
    //     return getDefaultKeyBinding(e);
    // };

    const toggleBlockType = (blockType: string) => {
        handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle: string) => {
        handleEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const contentState = editorState.getCurrentContent();
    let className = 'RichEditor-editor';
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className="RichEditor-root">
            <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
            <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
            <div className={className} onClick={focusEditor}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    // handleKeyCommand={handleKeyCommand}
                    // keyBindingFn={mapKeyToEditorCommand}
                    onChange={handleEditorChange}
                    placeholder="Tell a story..."
                    ref={editor}
                    spellCheck={true}
                />
            </div>
        </div>
    );
};

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block: ContentBlock): string {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return '';
    }
}

interface StyleButtonProps {
    active: boolean;
    label: string;
    onToggle: (style: string) => void;
    style: string;
}
const StyleButton: React.FC<StyleButtonProps> = ({ label, onToggle, style, active }) => {

    let className = 'RichEditor-styleButton';
    if (active) {
        className += ' RichEditor-activeButton';
    }

    return (
        <span className={className} onMouseDown={(e) => { e.preventDefault(); onToggle(style); }}>
            {label}
        </span>
    );
};
type BlockType =
    | 'header-one'
    | 'header-two'
    | 'header-three'
    | 'header-four'
    | 'header-five'
    | 'header-six'
    | 'blockquote'
    | 'unordered-list-item'
    | 'ordered-list-item'
    | 'code-block';

const BLOCK_TYPES: { label: string; style: BlockType }[] = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];

interface BlockStyleControlsProps {
    editorState: EditorState;
    onToggle: (style: string) => void;

}

const BlockStyleControls: React.FC<BlockStyleControlsProps> = ({ editorState, onToggle }) => {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

interface InlineStyleControlsProps {
    editorState: EditorState;
    onToggle: (inlineStyle: string) => void;
}

const InlineStyleControls: React.FC<InlineStyleControlsProps> = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

export default DraftEditor;
