import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import {
    Bold, Italic, Strikethrough,
    Heading1, Heading2, List, ListOrdered,
    Code, Quote, Image as ImageIcon,
    Link as LinkIcon, AlignLeft, Undo2Icon, Redo2Icon, RemoveFormatting,
    Table as TableIcon, BetweenVerticalStart, BetweenVerticalEnd, BetweenHorizontalStart,BetweenHorizontalEnd
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ToolbarButton = ({
                           onClick,
                           active,
                           disabled,
                           title,
                           icon: Icon
                       }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    icon: React.ElementType;
}) => (
    <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className={cn("rounded hover:bg-gray-200", active && 'bg-gray-200')}
        title={title}
    >
        <Icon className="h-4 w-4" />
    </Button>
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-50 rounded-t-lg border border-gray-200">
            {/* Undo/Redo */}
            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo"
                icon={Undo2Icon}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo"
                icon={Redo2Icon}
            />
            {/* Formatting */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive('bold')}
                title="Bold"
                icon={Bold}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive('italic')}
                title="Italic"
                icon={Italic}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive('strike')}
                title="Strikethrough"
                icon={Strikethrough}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
                icon={Heading1}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
                icon={Heading2}
            />
            {/*Table*/}
            <ToolbarButton
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                active={editor.isActive('table')}
                title="Table"
                icon={TableIcon}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().addRowAfter().run()}
                disabled={!editor.can().addRowAfter()}
                title="Add Row After"
                icon={BetweenVerticalStart} // use a Lucide icon or similar
            />

            <ToolbarButton
                onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}
                disabled={!editor.can().addRowBefore()}
                title={'Add Row Before'}
                icon={BetweenVerticalEnd}
            />

            {/*<ToolbarButton*/}
            {/*    title="Insert HTML table"*/}
            {/*    onClick={() =>*/}
            {/*        editor.chain().focus().insertContent(tableHTML, {*/}
            {/*            parseOptions: { preserveWhitespace: false },*/}
            {/*        }).run()*/}
            {/*    }*/}
            {/*    icon={BetweenVerticalStart}*/}
            {/*/>*/}

            <ToolbarButton
                title={'Add Column Before'}
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                disabled={!editor.can().addColumnBefore()}
                icon={BetweenHorizontalStart}
            />

            <ToolbarButton
                title="Add column After"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                disabled={!editor.can().addColumnAfter()}
                icon={BetweenHorizontalEnd}
            />
            <ToolbarButton
                title="Delete Column"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                disabled={!editor.can().deleteColumn()}
                icon={BetweenVerticalStart}
            />
            
            <ToolbarButton
                title="Delete row"
                onClick={() => editor.chain().focus().deleteRow().run()}
                disabled={!editor.can().deleteRow()}
                icon={BetweenVerticalStart}
            />

            <ToolbarButton
                title="Set cell attribute"
                onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()}
                disabled={!editor.can().setCellAttribute('backgroundColor', '#FAF594')}
                icon={BetweenVerticalStart}
            />

            {/* Lists & Code */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
                title="Bullet List"
                icon={List}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
                title="Ordered List"
                icon={ListOrdered}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                active={editor.isActive('codeBlock')}
                title="Code Block"
                icon={Code}
            />
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive('blockquote')}
                title="Blockquote"
                icon={Quote}
            />

            {/* Media & Links */}
            <ToolbarButton
                onClick={() => {
                    const url = window.prompt('Enter image URL:');
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                }}
                title="Insert Image"
                icon={ImageIcon}
            />
            <ToolbarButton
                onClick={() => {
                    const prevUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', prevUrl);
                    if (url === null) return;
                    if (url === '') {
                        editor.chain().focus().extendMarkRange('link').unsetLink().run();
                        return;
                    }
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }}
                active={editor.isActive('link')}
                title="Insert Link"
                icon={LinkIcon}
            />

            {/* Alignment */}
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                active={editor.isActive({ textAlign: 'left' })}
                title="Align Left"
                icon={AlignLeft}
            />
            {/* Clear Formatting */}
            <ToolbarButton
                onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                title="Clear Formatting"
                icon={RemoveFormatting}
            />
        </div>
    );
};

const TiptapEditor = ({
                          content,
                          onChange,
                          placeholder = 'Write something...',
                      }: {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2] },
            }),
            Image,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            Placeholder.configure({ placeholder }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    'prose dark:prose-invert prose-li:marker:text-gray-600 prose-ul:pl-5 prose-ol:pl-5 list-decimal focus:outline-none max-w-full p-4 min-h-[200px]',
            },
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || '');
        }
    }, [content, editor]);

    return (
        <div className="border border-gray-200 rounded-lg bg-white">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
