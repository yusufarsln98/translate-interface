import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react'
import React, { useState, useEffect } from 'react'

type TranslatorType = {
  id: string
  modelName: string
  modelUrl: string
  label: string
}

interface UpdateTranslatorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updatedTranslator: TranslatorType) => void
  translator: TranslatorType
}

export default function UpdateTranslatorModal({
  isOpen,
  onClose,
  onSave,
  translator,
}: UpdateTranslatorModalProps) {
  const [updatedTranslator, setUpdatedTranslator] =
    useState<TranslatorType>(translator)

  useEffect(() => {
    setUpdatedTranslator(translator)
  }, [translator])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TranslatorType
  ) => {
    setUpdatedTranslator({
      ...updatedTranslator,
      [field]: e.target.value,
    })
  }

  const handleSave = () => {
    onSave(updatedTranslator)
    onClose() // Close the modal after saving
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Translator
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="modelName">Model Name</label>
                  <Input
                    id="modelName"
                    value={updatedTranslator.modelName}
                    onChange={(e) => handleInputChange(e, 'modelName')}
                  />
                </div>
                <div>
                  <label htmlFor="modelUrl">Model URL</label>
                  <Input
                    id="modelUrl"
                    value={updatedTranslator.modelUrl}
                    onChange={(e) => handleInputChange(e, 'modelUrl')}
                  />
                </div>
                <div>
                  <label htmlFor="label">Label</label>
                  <Input
                    id="label"
                    value={updatedTranslator.label}
                    onChange={(e) => handleInputChange(e, 'label')}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
